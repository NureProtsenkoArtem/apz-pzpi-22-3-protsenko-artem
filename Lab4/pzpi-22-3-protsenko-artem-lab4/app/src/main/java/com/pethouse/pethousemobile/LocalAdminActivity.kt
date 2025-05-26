package com.pethouse.pethousemobile

import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.pethouse.pethousemobile.adapters.UserAdapter
import com.pethouse.pethousemobile.databinding.ActivityDbAdminBinding
import com.pethouse.pethousemobile.databinding.ActivityLocalAdminBinding
import com.pethouse.pethousemobile.network.Admin.AdminRepository
import com.pethouse.pethousemobile.network.RetrofitClient
import com.pethouse.pethousemobile.network.User.UserRepository
import kotlinx.coroutines.launch

class LocalAdminActivity : BaseActivity() {

    private lateinit var binding: ActivityLocalAdminBinding
    private lateinit var userRepository: UserRepository
    private lateinit var adminRepository: AdminRepository
    private lateinit var adapter: UserAdapter


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLocalAdminBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        userRepository = UserRepository(RetrofitClient.userService)
        adminRepository = AdminRepository(RetrofitClient.adminService)

        adapter = UserAdapter { userId, newRole ->
            updateUserRole(userId, newRole, token)
        }
        binding.userRecyclerView.layoutManager = LinearLayoutManager(this)
        binding.userRecyclerView.adapter = adapter

        lifecycleScope.launch {
            try {
                val users = userRepository.fetchUsers(token)
                adapter.submitList(users)
            } catch (e: Exception) {
            }
        }
    }

    private fun updateUserRole(userId: String, newRole: String,token: String?) {
        lifecycleScope.launch {
            try {
                adminRepository.changeUserRole(userId, newRole, token)
                Toast.makeText(this@LocalAdminActivity, "Role updated", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this@LocalAdminActivity, "Update failed", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
