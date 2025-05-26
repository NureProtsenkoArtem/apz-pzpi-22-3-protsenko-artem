package com.pethouse.pethousemobile

import android.content.SharedPreferences
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityEditPetBinding
import com.pethouse.pethousemobile.databinding.ActivityHealthAnalysesBinding
import com.pethouse.pethousemobile.models.Pet.EditPetRequest
import com.pethouse.pethousemobile.models.Pet.PetDto
import com.pethouse.pethousemobile.network.HealthAnalysis.HealthAnalysisRepository
import com.pethouse.pethousemobile.network.Pet.PetRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class EditPetActivity : BaseActivity() {

    private lateinit var petRepository: PetRepository
    private lateinit var repository: HealthAnalysisRepository
    private lateinit var binding: ActivityEditPetBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_pet)

        binding = ActivityEditPetBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        val etName = findViewById<EditText>(R.id.etPetName)
        val etBreed = findViewById<EditText>(R.id.etPetBreed)
        val etWeight = findViewById<EditText>(R.id.etPetWeight)
        val etCalories = findViewById<EditText>(R.id.etCaloriesPerDay)
        val spinner = findViewById<Spinner>(R.id.spinnerActivityLevel)
        val btnUpdate = findViewById<Button>(R.id.btnUpdatePet)

        val activityLevels = listOf("Low", "Medium", "High")
        spinner.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, activityLevels)

        petRepository = PetRepository(RetrofitClient.petService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)

        val token = sharedPref.getString("ACCESS_TOKEN", null) ?: return
        val petId = intent.getStringExtra("PET_ID") ?: return

        CoroutineScope(Dispatchers.IO).launch {
            val pet: PetDto? = petRepository.getPetById(petId, "Bearer $token")
            pet?.let {
                withContext(Dispatchers.Main) {
                    etName.setText(it.petName)
                    etBreed.setText(it.petType)
                    etWeight.setText(it.petWeight.toString())
                    etCalories.setText(it.caloriesPerDay.toString())
                    val idx = activityLevels.indexOf(it.activityLevel)
                    if (idx != -1) spinner.setSelection(idx)
                }
            }
        }

        btnUpdate.setOnClickListener {
            val petName = etName.text.toString()
            val petBreed = etBreed.text.toString()
            val petWeight = etWeight.text.toString().toIntOrNull() ?: 0
            val caloriesPerDay = etCalories.text.toString().toIntOrNull() ?: 0
            val activityLevel = spinner.selectedItem.toString()

            val request = EditPetRequest(
                petName = petName,
                petBreed = petBreed,
                petWeight = petWeight.toDouble(),
                caloriesPerDay = caloriesPerDay.toDouble(),
                activityLevel = activityLevel
            )

            CoroutineScope(Dispatchers.IO).launch {
                val success = petRepository.updatePet(petId, "Bearer $token", request)
                withContext(Dispatchers.Main) {
                    if (success) {
                        Toast.makeText(this@EditPetActivity, getString(R.string.pet_update_success), Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@EditPetActivity, getString(R.string.error), Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }
}
