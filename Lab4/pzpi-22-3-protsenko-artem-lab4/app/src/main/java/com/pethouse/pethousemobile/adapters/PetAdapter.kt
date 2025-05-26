package com.pethouse.pethousemobile.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pethouse.pethousemobile.R
import com.pethouse.pethousemobile.models.Pet.PetResponse
import com.pethouse.pethousemobile.utils.MathUtils

class PetAdapter(
    private val pets: List<PetResponse>,
    private val onItemClick: (PetResponse) -> Unit
) : RecyclerView.Adapter<PetAdapter.PetViewHolder>() {

    class PetViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvPetName: TextView = itemView.findViewById(R.id.tvPetName)
        val tvPetBreed: TextView = itemView.findViewById(R.id.tvPetBreed)
        val tvPetWeight: TextView = itemView.findViewById(R.id.tvPetWeight)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PetViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_pet, parent, false)
        return PetViewHolder(view)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: PetViewHolder, position: Int) {
        val pet = pets[position]
        val context = holder.itemView.context
        val currentLocale = context.resources.configuration.locales[0]
        val isEnglish = currentLocale.language == "en"

        holder.tvPetName.text = context.getString(R.string.pet_name) + ": ${pet.petName}"
        holder.tvPetBreed.text = context.getString(R.string.pet_breed) + ": ${pet.petType}"

        val weightText = if (isEnglish) {
            val pounds = MathUtils.kgToPounds(pet.petWeight?.toDouble() ?: 0.0)
            context.getString(R.string.weight) + ": %.2f lbs".format(pounds)
        } else {
            context.getString(R.string.weight) + ": ${pet.petWeight} кг"
        }


        holder.tvPetWeight.text = weightText

        holder.itemView.setOnClickListener {
            onItemClick(pet)
        }
    }


    override fun getItemCount() = pets.size
}

