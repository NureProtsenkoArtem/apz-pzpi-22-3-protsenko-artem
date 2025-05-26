package com.pethouse.pethousemobile

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.SharedPreferences
import android.os.Build
import android.os.Bundle
import android.widget.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityAddMealBinding
import com.pethouse.pethousemobile.databinding.ActivityCreateAnalysisBinding
import com.pethouse.pethousemobile.models.Meal.MealRequest
import com.pethouse.pethousemobile.network.Meal.MealRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class AddMealActivity : BaseActivity() {

    private lateinit var mealRepository: MealRepository
    private lateinit var selectedDateTime: LocalDateTime
    private lateinit var petId: String
    private lateinit var binding: ActivityAddMealBinding

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_meal)

        binding = ActivityAddMealBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        petId = intent.getStringExtra("PET_ID") ?: return
        mealRepository = MealRepository(RetrofitClient.mealService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        val portionSize = findViewById<EditText>(R.id.etPortionSize)
        val calorificValue = findViewById<EditText>(R.id.etCalorificValue)
        val foodType = findViewById<EditText>(R.id.etFoodType)
        val cbAdaptive = findViewById<CheckBox>(R.id.cbAdaptiveAdjustment)
        val cbIsDaily = findViewById<CheckBox>(R.id.cbIsDaily)
        val btnPickDate = findViewById<Button>(R.id.btnPickDate)
        val btnPickTime = findViewById<Button>(R.id.btnPickTime)
        val tvSelectedDateTime = findViewById<TextView>(R.id.tvSelectedDateTime)
        val btnSubmit = findViewById<Button>(R.id.btnSubmitMeal)

        selectedDateTime = LocalDateTime.now()
        updateDateTimeText(tvSelectedDateTime)

        btnPickDate.setOnClickListener {
            showDatePicker(tvSelectedDateTime)
        }

        btnPickTime.setOnClickListener {
            showTimePicker(tvSelectedDateTime)
        }

        btnSubmit.setOnClickListener {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
            val startTimeFormatted = selectedDateTime.format(formatter)

            val meal = MealRequest(
                portionSize = portionSize.text.toString().toDoubleOrNull() ?: 0.0,
                startTime = startTimeFormatted,
                calorificValue = calorificValue.text.toString().toDoubleOrNull() ?: 0.0,
                adaptiveAdjustment = cbAdaptive.isChecked,
                foodType = foodType.text.toString(),
                isDaily = cbIsDaily.isChecked
            )


            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val success = mealRepository.createMeal(petId, "Bearer $token", meal)
                    runOnUiThread {
                        if (success) {
                            Toast.makeText(this@AddMealActivity, getString(R.string.meal_added), Toast.LENGTH_SHORT).show()
                            finish()
                        } else {
                            Toast.makeText(this@AddMealActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
                        }
                    }
                } catch (e: Exception) {
                    runOnUiThread {
                        Toast.makeText(this@AddMealActivity, "${getString(R.string.error)} ${e.message}", Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun showDatePicker(tv: TextView) {
        val now = Calendar.getInstance()
        DatePickerDialog(this, { _, year, month, day ->
            selectedDateTime = selectedDateTime.withYear(year).withMonth(month + 1).withDayOfMonth(day)
            updateDateTimeText(tv)
        }, now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH)).show()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun showTimePicker(tv: TextView) {
        val now = Calendar.getInstance()
        TimePickerDialog(this, { _, hour, minute ->
            selectedDateTime = selectedDateTime.withHour(hour).withMinute(minute)
            updateDateTimeText(tv)
        }, now.get(Calendar.HOUR_OF_DAY), now.get(Calendar.MINUTE), true).show()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun updateDateTimeText(tv: TextView) {
        val formatted = selectedDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
        tv.text = formatted
    }
}
