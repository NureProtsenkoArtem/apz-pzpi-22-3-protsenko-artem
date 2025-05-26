package com.pethouse.pethousemobile

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.pethouse.pethousemobile.adapters.PetAdapter
import com.pethouse.pethousemobile.databinding.ActivityMainBinding
import com.pethouse.pethousemobile.databinding.ActivityPetCatalogBinding
import com.pethouse.pethousemobile.network.Pet.PetRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserPetsActivity : BaseActivity() {

    private lateinit var petRepository: PetRepository
    private lateinit var recyclerView: RecyclerView
    private lateinit var binding: ActivityPetCatalogBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityPetCatalogBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        recyclerView = findViewById(R.id.rvPets)
        recyclerView.layoutManager = LinearLayoutManager(this)

        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        petRepository = PetRepository(RetrofitClient.petService)

        val userId = sharedPref.getString("USER_ID", null)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        if (userId.isNullOrEmpty() || token.isNullOrEmpty()) {
            Toast.makeText(this, getString(R.string.user_not_authenticated), Toast.LENGTH_SHORT).show()
            return
        }

        CoroutineScope(Dispatchers.IO).launch {
            val pets = petRepository.getUserPets(userId, "Bearer $token")
            runOnUiThread {
                if (pets != null) {
                    recyclerView.adapter = PetAdapter(pets) { pet ->
                        val intent = Intent(this@UserPetsActivity, PetDetailsActivity::class.java)
                        intent.putExtra("PET_ID", pet.petId)
                        startActivity(intent)
                    }
                } else {
                    Toast.makeText(this@UserPetsActivity, getString(R.string.error_fetch), Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
