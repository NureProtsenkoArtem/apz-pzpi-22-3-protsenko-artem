package com.pethouse.pethousemobile

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.SharedPreferences
import android.os.Build
import android.os.Bundle
import android.widget.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityEditMealBinding
import com.pethouse.pethousemobile.databinding.ActivityHealthAnalysesBinding
import com.pethouse.pethousemobile.models.Meal.UpdateMealRequest
import com.pethouse.pethousemobile.models.Meal.MealDto
import com.pethouse.pethousemobile.network.Meal.MealRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class EditMealActivity : BaseActivity() {

    private lateinit var mealRepository: MealRepository
    private lateinit var binding: ActivityEditMealBinding
    private lateinit var selectedDateTime: LocalDateTime

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_meal)

        binding = ActivityEditMealBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        val etPortionSize = findViewById<EditText>(R.id.etPortionSize)
        val btnPickDate = findViewById<Button>(R.id.btnPickDate)
        val btnPickTime = findViewById<Button>(R.id.btnPickTime)
        val tvSelectedDateTime = findViewById<TextView>(R.id.tvSelectedDateTime)
        val etMealStatus = findViewById<EditText>(R.id.etMealStatus)
        val etCaloriesConsumed = findViewById<EditText>(R.id.etCaloriesConsumed)
        val cbAdaptiveAdjustment = findViewById<CheckBox>(R.id.cbAdaptiveAdjustment)
        val etFoodType = findViewById<EditText>(R.id.etFoodType)
        val etCalorificValue = findViewById<EditText>(R.id.etCalorificValue)
        val cbIsDaily = findViewById<CheckBox>(R.id.cbIsDaily)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)

        mealRepository = MealRepository(RetrofitClient.mealService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)

        val token = sharedPref.getString("ACCESS_TOKEN", null) ?: return
        val mealId = intent.getStringExtra("MEAL_ID") ?: return

        selectedDateTime = LocalDateTime.now()


        CoroutineScope(Dispatchers.IO).launch {
            val meal: MealDto? = mealRepository.getMealById(mealId, "Bearer $token")
            meal?.let {
                withContext(Dispatchers.Main) {
                    etPortionSize.setText(it.portionSize.toString())
                    selectedDateTime = LocalDateTime.parse(it.startTime, DateTimeFormatter.ISO_DATE_TIME)
                    updateDateTimeText(tvSelectedDateTime)
                    etMealStatus.setText(it.mealStatus)
                    etCaloriesConsumed.setText(it.caloriesConsumed.toString())
                    cbAdaptiveAdjustment.isChecked = it.adaptiveAdjustment
                    etFoodType.setText(it.foodType)
                    etCalorificValue.setText(it.calorificValue.toString())
                    cbIsDaily.isChecked = it.isDaily
                }
            }
        }

        btnPickDate.setOnClickListener {
            showDatePicker(tvSelectedDateTime)
        }

        btnPickTime.setOnClickListener {
            showTimePicker(tvSelectedDateTime)
        }

        btnSubmit.setOnClickListener {
            val formatter = DateTimeFormatter.ISO_DATE_TIME
            val startTimeFormatted = selectedDateTime.format(formatter)

            val updateRequest = UpdateMealRequest(
                portionSize = etPortionSize.text.toString().toDoubleOrNull() ?: 0.0,
                startTime = startTimeFormatted,
                mealStatus = etMealStatus.text.toString(),
                caloriesConsumed = etCaloriesConsumed.text.toString().toDoubleOrNull() ?: 0.0,
                adaptiveAdjustment = cbAdaptiveAdjustment.isChecked,
                foodType = etFoodType.text.toString(),
                calorificValue = etCalorificValue.text.toString().toDoubleOrNull() ?: 0.0,
                isDaily = cbIsDaily.isChecked
            )

            CoroutineScope(Dispatchers.IO).launch {
                val success = mealRepository.updateMeal(mealId, "Bearer $token", updateRequest)
                withContext(Dispatchers.Main) {
                    if (success) {
                        Toast.makeText(this@EditMealActivity, getString(R.string.meal_update_success), Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@EditMealActivity, getString(R.string.error), Toast.LENGTH_LONG).show()
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
