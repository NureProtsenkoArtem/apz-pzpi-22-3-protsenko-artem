package com.pethouse.pethousemobile

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.pethouse.pethousemobile.adapters.LogsAdapter
import com.pethouse.pethousemobile.databinding.ActivityLocalAdminBinding
import com.pethouse.pethousemobile.databinding.ActivitySystemAdminBinding
import com.pethouse.pethousemobile.models.Admin.ServerConfig
import com.pethouse.pethousemobile.network.Admin.AdminRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import kotlinx.coroutines.launch

class SystemAdminActivity : BaseActivity() {

    private lateinit var binding: ActivitySystemAdminBinding
    private lateinit var repository: AdminRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySystemAdminBinding.inflate(layoutInflater)
        setActivityContent(binding.root)


        repository = AdminRepository(RetrofitClient.adminService)

        binding.recyclerLogs.layoutManager = LinearLayoutManager(this)

        loadServerStatus()
        loadConfiguration()
        loadLogs()

        binding.btnSaveConfig.setOnClickListener {
            saveConfig()
        }

        binding.btnDeleteLogs.setOnClickListener {
            val days = binding.editDays.text.toString().toIntOrNull()
            if (days != null) {
                deleteOldLogs(days)
            } else {
                Toast.makeText(this, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    @SuppressLint("SetTextI18n")
    private fun loadServerStatus() {
        lifecycleScope.launch {
            try {
                val status = repository.getServerStatus()
                binding.textStatus.text = "${getString(R.string.online)}: ${status.isAlive}"
                binding.textUptime.text = "${getString(R.string.uptime)}: ${status.uptime}"
                binding.textCpu.text = "${getString(R.string.cpu)}: ${status.cpuUsagePercent}%"
                binding.textMemory.text = "${getString(R.string.memory)}: ${status.memoryUsageMB} MB"
            } catch (e: Exception) {
                Toast.makeText(this@SystemAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun loadConfiguration() {
        lifecycleScope.launch {
            try {
                val config = repository.getServerConfiguration()
                binding.editAccessKey.setText(config.accessSecretKey)
                binding.editRefreshKey.setText(config.refreshSecretKey)
                binding.editEncryptionKey.setText(config.encryptionKey)
            } catch (e: Exception) {
                Toast.makeText(this@SystemAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun saveConfig() {
        val config = ServerConfig(
            accessSecretKey = binding.editAccessKey.text.toString(),
            refreshSecretKey = binding.editRefreshKey.text.toString(),
            encryptionKey = binding.editEncryptionKey.text.toString()
        )

        lifecycleScope.launch {
            try {
                repository.updateServerConfiguration(config)
                Toast.makeText(this@SystemAdminActivity, getString(R.string.config_saved), Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this@SystemAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun loadLogs() {
        lifecycleScope.launch {
            try {
                val logs = repository.getSystemLogs()
                val adapter = LogsAdapter(logs)
                binding.recyclerLogs.adapter = adapter
            } catch (e: Exception) {
                Toast.makeText(this@SystemAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun deleteOldLogs(days: Int) {
        lifecycleScope.launch {
            try {
                repository.deleteOldLogs(days)
                Toast.makeText(this@SystemAdminActivity, getString(R.string.old_logs_delete), Toast.LENGTH_SHORT).show()
                loadLogs()
            } catch (e: Exception) {
                Toast.makeText(this@SystemAdminActivity, getString(R.string.error), Toast.LENGTH_SHORT).show()
            }
        }
    }
}
