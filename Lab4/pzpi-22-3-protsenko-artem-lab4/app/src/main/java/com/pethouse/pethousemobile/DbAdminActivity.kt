package com.pethouse.pethousemobile

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.lifecycleScope
import com.pethouse.pethousemobile.databinding.ActivityDbAdminBinding
import com.pethouse.pethousemobile.network.Admin.AdminRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import com.pethouse.pethousemobile.utils.DateTimeUtils
import com.pethouse.pethousemobile.utils.DateTimeUtils.formatIsoDateTime
import kotlinx.coroutines.launch
import java.util.Locale

class DbAdminActivity : BaseActivity() {

    private lateinit var binding: ActivityDbAdminBinding
    private lateinit var repository: AdminRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDbAdminBinding.inflate(layoutInflater)
        setActivityContent(binding.root)
        repository = AdminRepository(RetrofitClient.adminService)

        loadDbStatus()

        binding.buttonBackup.setOnClickListener {
            val path = binding.editBackupPath.text.toString()
            if (path.isNotBlank()) createBackup(path)
        }

        binding.buttonRestore.setOnClickListener {
            val path = binding.editRestorePath.text.toString()
            if (path.isNotBlank()) restoreDb(path)
        }
    }

    @SuppressLint("SetTextI18n")
    private fun loadDbStatus() {
        lifecycleScope.launch {
            try {
                val status = repository.getStatus()
                val currentLocale = resources.configuration.locales[0]
                val isEnglish = currentLocale.language == "en"

                val formattedCheckedAt = if (isEnglish) {
                    DateTimeUtils.formatToUSDateTime(status.checkedAt)
                } else {
                    formatIsoDateTime(status.checkedAt)
                }

                binding.textDbDetails.text = """
                    ${getString(R.string.connection)}: ${if (status.isDatabaseConnected) getString(R.string.success) else getString(R.string.error)}
                    ${getString(R.string.db_size)}: ${status.databaseSizeMB} MB
                    ${getString(R.string.checked)}: $formattedCheckedAt
                """.trimIndent()
            } catch (e: Exception) {
                binding.textDbDetails.text = getString(R.string.error)
            }
        }
    }

    private fun createBackup(path: String) {
        lifecycleScope.launch {
            try {
                repository.createBackup(path)
                Toast.makeText(this@DbAdminActivity, getString(R.string.backup_created), Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this@DbAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun restoreDb(path: String) {
        lifecycleScope.launch {
            try {
                repository.restoreDb(path)
                Toast.makeText(this@DbAdminActivity, getString(R.string.restore_created), Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this@DbAdminActivity, "${getString(R.string.error)} ${e.message}", Toast.LENGTH_SHORT).show()
                Log.e("restore", "${e.message}")
            }
        }
    }
}
