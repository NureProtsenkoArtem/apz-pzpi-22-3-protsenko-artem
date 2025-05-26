package com.pethouse.pethousemobile

import android.app.DatePickerDialog
import android.content.SharedPreferences
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityCreateAnalysisBinding
import com.pethouse.pethousemobile.databinding.ActivityCreatePetBinding
import com.pethouse.pethousemobile.network.HealthAnalysis.HealthAnalysisRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.time.LocalDate

class CreateAnalysisActivity : BaseActivity() {

    private lateinit var petId: String
    private lateinit var tvStartDate: TextView
    private lateinit var tvEndDate: TextView
    private lateinit var repository: HealthAnalysisRepository
    private lateinit var binding: ActivityCreateAnalysisBinding

    private var startDate: LocalDate? = null
    private var endDate: LocalDate? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_analysis)

        binding = ActivityCreateAnalysisBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        petId = intent.getStringExtra("PET_ID") ?: return
        repository = HealthAnalysisRepository(RetrofitClient.healthAnalysisService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        val token = sharedPref.getString("ACCESS_TOKEN", null)
        tvStartDate = findViewById(R.id.tvStartDate)
        tvEndDate = findViewById(R.id.tvEndDate)
        val btnCreate = findViewById<Button>(R.id.btnCreateAnalysis)

        tvStartDate.setOnClickListener {
            showDatePicker { date ->
                startDate = date
                tvStartDate.text = date.toString()
            }
        }

        tvEndDate.setOnClickListener {
            showDatePicker { date ->
                endDate = date
                tvEndDate.text = date.toString()
            }
        }

        btnCreate.setOnClickListener {
            if (startDate == null || endDate == null) {
                Toast.makeText(this, getString(R.string.chose_both_dates), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (endDate!!.isBefore(startDate)) {
                Toast.makeText(this, getString(R.string.error), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            createAnalysis(token)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun showDatePicker(onDateSelected: (LocalDate) -> Unit) {
        val now = LocalDate.now()
        val picker = DatePickerDialog(this,
            { _, year, month, dayOfMonth ->
                val selectedDate = LocalDate.of(year, month + 1, dayOfMonth)
                onDateSelected(selectedDate)
            },
            now.year, now.monthValue - 1, now.dayOfMonth
        )
        picker.show()
    }

    private fun createAnalysis(token: String?) {
        CoroutineScope(Dispatchers.IO).launch {
            val response = repository.createAnalysis(
                petId,
                token = "Bearer ${token}",
                startDate!!.toString(),
                endDate!!.toString()
            )
            withContext(Dispatchers.Main) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CreateAnalysisActivity, getString(R.string.analysis_completed), Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@CreateAnalysisActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
