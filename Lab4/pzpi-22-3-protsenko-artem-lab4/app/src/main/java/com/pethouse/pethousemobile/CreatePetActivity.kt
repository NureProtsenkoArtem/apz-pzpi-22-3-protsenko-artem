package com.pethouse.pethousemobile

import android.content.SharedPreferences
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.R
import com.pethouse.pethousemobile.databinding.ActivityCreatePetBinding
import com.pethouse.pethousemobile.databinding.ActivityMainBinding
import com.pethouse.pethousemobile.models.Pet.CreatePetRequest
import com.pethouse.pethousemobile.network.Pet.PetRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CreatePetActivity : BaseActivity() {

    private lateinit var petRepository: PetRepository
    private lateinit var binding: ActivityCreatePetBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityCreatePetBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        petRepository = PetRepository(RetrofitClient.petService)

        val etPetName = findViewById<EditText>(R.id.etPetName)
        val etPetBreed = findViewById<EditText>(R.id.etPetBreed)
        val etPetWeight = findViewById<EditText>(R.id.etPetWeight)
        val etCaloriesPerDay = findViewById<EditText>(R.id.etCaloriesPerDay)
        val spinnerActivityLevel = findViewById<Spinner>(R.id.spinnerActivityLevel)
        val btnCreateCourse = findViewById<Button>(R.id.btnCreateCourse)

        val activityLevels = listOf("Low", "Moderate", "High")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, activityLevels)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerActivityLevel.adapter = adapter

        btnCreateCourse.setOnClickListener {
            val userId = sharedPref.getString("USER_ID", null)
            val token = sharedPref.getString("ACCESS_TOKEN", null)

            if (userId.isNullOrEmpty() || token.isNullOrEmpty()) {
                Toast.makeText(this, getString(R.string.user_not_authenticated), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val name = etPetName.text.toString()
            val breed = etPetBreed.text.toString()
            val weight = etPetWeight.text.toString().toDoubleOrNull() ?: 0.0
            val calories = etCaloriesPerDay.text.toString().toIntOrNull() ?: 0
            val activity = spinnerActivityLevel.selectedItem.toString()

            val request = CreatePetRequest(name, breed, weight, calories, activity)

            CoroutineScope(Dispatchers.IO).launch {
                val result = petRepository.createPet(userId, request, "Bearer $token")
                runOnUiThread {
                    if (result != null) {
                        Toast.makeText(this@CreatePetActivity, getString(R.string.pet_created), Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@CreatePetActivity, getString(R.string.pet_creation_failed), Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }
}
