package com.pethouse.pethousemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.pethouse.pethousemobile.databinding.ActivityMainBinding
import android.content.SharedPreferences
import android.view.View
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : BaseActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        binding.btnDbAdmin.setOnClickListener {
            startActivity(Intent(this, DbAdminActivity::class.java))
        }

        binding.btnSystemAdmin.setOnClickListener {
            startActivity(Intent(this, SystemAdminActivity::class.java))
        }

        binding.btnLocalAdmin.setOnClickListener {
            startActivity(Intent(this, LocalAdminActivity::class.java))
        }

        showAdminButtons()
    }

    private fun showAdminButtons() {
        val role = sharedPref.getString("USER_ROLE", null)

        binding.btnDbAdmin.visibility = View.GONE
        binding.btnSystemAdmin.visibility = View.GONE
        binding.btnLocalAdmin.visibility = View.GONE

        when (role) {
            "DbAdmin" -> binding.btnDbAdmin.visibility = View.VISIBLE
            "ApplicationAdmin" -> binding.btnSystemAdmin.visibility = View.VISIBLE
            "Admin" -> binding.btnLocalAdmin.visibility = View.VISIBLE
        }
    }
}


