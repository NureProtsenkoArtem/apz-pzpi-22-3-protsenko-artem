package com.pethouse.pethousemobile

import android.annotation.SuppressLint
import android.content.Intent
import android.content.SharedPreferences
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityCreatePetBinding
import com.pethouse.pethousemobile.databinding.ActivityHealthAnalysesBinding
import com.pethouse.pethousemobile.network.HealthAnalysis.HealthAnalysisRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import com.pethouse.pethousemobile.utils.DateTimeUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.time.LocalDate

class HealthAnalysesActivity : BaseActivity() {

    private lateinit var petId: String
    private lateinit var repository: HealthAnalysisRepository
    private lateinit var binding: ActivityHealthAnalysesBinding

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_health_analyses)

        binding = ActivityHealthAnalysesBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        petId = intent.getStringExtra("PET_ID") ?: return
        repository = HealthAnalysisRepository(RetrofitClient.healthAnalysisService)
        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        val btnAdd = findViewById<Button>(R.id.btnAddAnalysis)
        btnAdd.setOnClickListener {
            val intent = Intent(this, CreateAnalysisActivity::class.java)
            intent.putExtra("PET_ID", petId)
            startActivity(intent)
        }

        loadAnalyses(token)
    }

    override fun onResume() {
        super.onResume()
        val token = sharedPref.getString("ACCESS_TOKEN", null)
        loadAnalyses(token)
    }

    @SuppressLint("SetTextI18n")
    private fun loadAnalyses(token: String?) {
        CoroutineScope(Dispatchers.IO).launch {
            val analyses = repository.getAnalyses(petId,"Bearer ${token}")
            val currentLocale = resources.configuration.locales[0]
            val isEnglish = currentLocale.language == "en"

            runOnUiThread {
                val container = findViewById<LinearLayout>(R.id.llAnalyses)
                container.removeAllViews()
                analyses.forEach { analysis ->
                    val card = layoutInflater.inflate(R.layout.item_analysis, container, false)

                    card.findViewById<TextView>(R.id.tvAnalysisType).text =
                        "${getString(R.string.type)}: ${analysis.healthAnalysisType}"

                    card.findViewById<TextView>(R.id.tvCalories).text =
                        "${getString(R.string.calories_consumed)}: ${analysis.caloriesConsumed}"

                    val formattedStartDate = if (isEnglish) {
                        DateTimeUtils.formatToUSDateTime(analysis.analysisStartDate)
                    } else {
                        analysis.analysisStartDate
                    }
                    val formattedEndDate = if (isEnglish) {
                        DateTimeUtils.formatToUSDateTime(analysis.analysisEndDate)
                    } else {
                        analysis.analysisEndDate
                    }
                    card.findViewById<TextView>(R.id.tvDates).text =
                        "${getString(R.string.dates)}: $formattedStartDate - $formattedEndDate"

                    card.findViewById<TextView>(R.id.tvRecommendations).text =
                        "${getString(R.string.recommendations)} ${analysis.recomendations}"

                    container.addView(card)
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun createAnalysis(token: String?) {
        CoroutineScope(Dispatchers.IO).launch {
            val today = java.time.LocalDate.now().toString()
            val result = repository.createAnalysis(petId,"Bearer ${token}",today, today)
            if (result.isSuccessful) {
                loadAnalyses(token)
            }
        }
    }
}