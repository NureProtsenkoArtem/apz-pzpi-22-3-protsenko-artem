package com.pethouse.pethousemobile

import android.annotation.SuppressLint
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.pethouse.pethousemobile.databinding.ActivityMainBinding
import com.pethouse.pethousemobile.databinding.ActivityPetCatalogBinding
import com.pethouse.pethousemobile.databinding.ActivityPetDetailsBinding
import com.pethouse.pethousemobile.network.Meal.MealRepository
import com.pethouse.pethousemobile.network.Pet.PetRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import com.pethouse.pethousemobile.utils.DateTimeUtils
import com.pethouse.pethousemobile.utils.MathUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PetDetailsActivity : BaseActivity() {

    private lateinit var petId: String
    private lateinit var petRepository: PetRepository
    private lateinit var mealRepository: MealRepository
    private lateinit var binding: ActivityPetDetailsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityPetDetailsBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        petId = intent.getStringExtra("PET_ID") ?: return
        petRepository = PetRepository(RetrofitClient.petService)
        mealRepository = MealRepository(RetrofitClient.mealService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        val btnAddMeal = findViewById<Button>(R.id.btnAddMeal)
        val btnEditPet = findViewById<Button>(R.id.btnEditPet)
        val btnHealth = findViewById<Button>(R.id.btnHealthAnalysises)

        btnAddMeal.setOnClickListener {
            val intent = Intent(this, AddMealActivity::class.java)
            intent.putExtra("PET_ID", petId)
            startActivity(intent)
        }

        btnEditPet.setOnClickListener {
            val intent = Intent(this, EditPetActivity::class.java)
            intent.putExtra("PET_ID", petId)
            startActivity(intent)
        }

        btnHealth.setOnClickListener {
            val intent = Intent(this, HealthAnalysesActivity::class.java)
            intent.putExtra("PET_ID", petId)
            startActivity(intent)
        }


        loadPetInfo(token)
        loadPetMeals()
    }

    override fun onResume() {
        super.onResume()
        val token = sharedPref.getString("ACCESS_TOKEN", null)
        loadPetInfo(token)
        loadPetMeals()
    }

    @SuppressLint("SetTextI18n")
    private fun loadPetInfo(token: String?) {
        CoroutineScope(Dispatchers.IO).launch {
            val pet = petRepository.getPetById(petId, "Bearer ${token}")
            val currentLocale = resources.configuration.locales[0]
            val isEnglish = currentLocale.language == "en"

            runOnUiThread {
                if (pet != null) {
                    findViewById<TextView>(R.id.tvPetName).text = pet.petName
                    findViewById<TextView>(R.id.tvPetType).text = pet.petType

                    val weightText = if (isEnglish) {
                        val pounds = MathUtils.kgToPounds(pet.petWeight.toDouble())
                        "${getString(R.string.weight)}: %.2f lbs".format(pounds)
                    } else {
                        "${getString(R.string.weight)}: ${pet.petWeight} кг"
                    }
                    findViewById<TextView>(R.id.tvPetWeight).text = weightText

                    findViewById<TextView>(R.id.tvCaloriesPerDay).text =
                        "${getString(R.string.calories_per_day)}: ${pet.caloriesPerDay}"
                    findViewById<TextView>(R.id.tvActivityLevel).text =
                        "${getString(R.string.activity_level)}: ${pet.activityLevel}"
                }
            }
        }
    }


    @SuppressLint("SetTextI18n")
    private fun loadPetMeals() {
        CoroutineScope(Dispatchers.IO).launch {
            val meals = mealRepository.getMealsByPetId(petId)
            val currentLocale = resources.configuration.locales[0]
            val isEnglish = currentLocale.language == "en"

            runOnUiThread {
                val container = findViewById<LinearLayout>(R.id.llMealsContainer)
                container.removeAllViews()
                meals.forEach { meal ->
                    val view = layoutInflater.inflate(R.layout.item_meal, container, false)
                    view.findViewById<TextView>(R.id.tvFoodType).text = meal.foodType

                    val formattedDateTime = if (isEnglish) {
                        DateTimeUtils.formatToUSDateTime(meal.startTime)
                    } else {
                        DateTimeUtils.formatIsoDateTime(meal.startTime)
                    }

                    val portionSizeText = if (isEnglish) {
                        val oz = MathUtils.gramsToOunces(meal.portionSize.toDouble())
                        "${getString(R.string.portion_size)}: %.2f oz".format(oz)
                    } else {
                        "${getString(R.string.portion_size)}: ${meal.portionSize} г"
                    }

                    view.findViewById<TextView>(R.id.tvTitleCalorificValue).text =
                        "${getString(R.string.calorific_value)}: ${meal.calorificValue}"
                    view.findViewById<TextView>(R.id.tvPortionSize).text = portionSizeText
                    view.findViewById<TextView>(R.id.tvMealTime).text =
                        "${getString(R.string.meal_start_time)}: $formattedDateTime"
                    view.findViewById<TextView>(R.id.tvCaloriesConsumed).text =
                        "${getString(R.string.calories_consumed)}: ${meal.caloriesConsumed}"
                    view.findViewById<TextView>(R.id.tvMealStatus).text =
                        "${getString(R.string.meal_status)}: ${meal.mealStatus}"

                    view.findViewById<Button>(R.id.btnEditMeal).setOnClickListener {
                        val intent = Intent(this@PetDetailsActivity, EditMealActivity::class.java)
                        intent.putExtra("MEAL_ID", meal.mealId)
                        startActivity(intent)
                    }

                    view.findViewById<Button>(R.id.btnDeleteMeal).setOnClickListener {
                        CoroutineScope(Dispatchers.IO).launch {
                            val token = sharedPref.getString("ACCESS_TOKEN", null)
                            if (token != null) {
                                val success = mealRepository.deleteMealById(meal.mealId, "Bearer $token")
                                runOnUiThread {
                                    if (success) {
                                        loadPetMeals()
                                    } else {
                                        Toast.makeText(
                                            this@PetDetailsActivity,
                                            getString(R.string.error),
                                            Toast.LENGTH_SHORT
                                        ).show()
                                    }
                                }
                            }
                        }
                    }

                    container.addView(view)
                }
            }
        }
    }
}
