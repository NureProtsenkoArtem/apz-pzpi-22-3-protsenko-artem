package com.pethouse.pethousemobile

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.Button
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.ViewDataBinding
import android.content.SharedPreferences
import com.pethouse.pethousemobile.databinding.ActivityBaseBinding

abstract class BaseActivity : AppCompatActivity() {

    private lateinit var baseBinding: ActivityBaseBinding
    protected lateinit var sharedPref: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        baseBinding = ActivityBaseBinding.inflate(layoutInflater)
        setContentView(baseBinding.root)

        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        setupBottomNavigation()
    }

    fun setActivityContent(view: View) {
        baseBinding.baseContainer.removeAllViews()
        baseBinding.baseContainer.addView(view)
    }

    private fun setupBottomNavigation() {
        updateMenu()

        baseBinding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_catalog -> {
                    startActivity(Intent(this, UserPetsActivity::class.java))
                    true
                }
                R.id.menu_login -> {
                    startActivity(Intent(this, LoginActivity::class.java))
                    true
                }
                R.id.menu_profile -> {
                    startActivity(Intent(this, UserProfileActivity::class.java))
                    true
                }
                R.id.menu_logout -> {
                    logoutUser()
                    true
                }
                R.id.menu_add_course -> {
                    startActivity(Intent(this, CreatePetActivity::class.java))
                    true
                }
                else -> false
            }
        }
    }

    private fun isUserLoggedIn(): Boolean {
        return sharedPref.getString("ACCESS_TOKEN", null) != null
    }

    private fun updateMenu() {
        val role = sharedPref.getString("USER_ROLE", null)
        val menu = baseBinding.bottomNavigation.menu
        val isLoggedIn = isUserLoggedIn()

        menu.findItem(R.id.menu_login).isVisible = !isLoggedIn

        listOf(
            R.id.menu_profile,
            R.id.menu_logout,
            R.id.menu_add_course,
            R.id.menu_catalog
        ).forEach {
            menu.findItem(it).isVisible = isLoggedIn
        }
    }

    private fun logoutUser() {
        sharedPref.edit().clear().apply()
        updateMenu()
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    override fun onResume() {
        super.onResume()
        updateMenu()
    }
}
