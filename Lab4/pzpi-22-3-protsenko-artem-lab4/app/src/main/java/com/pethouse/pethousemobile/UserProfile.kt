package com.pethouse.pethousemobile

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Toast
import com.pethouse.pethousemobile.databinding.ActivityUserProfileBinding
import com.pethouse.pethousemobile.network.RetrofitClient
import com.pethouse.pethousemobile.network.User.UserRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserProfileActivity : BaseActivity() {

    private lateinit var binding: ActivityUserProfileBinding
    private lateinit var userRepository: UserRepository

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityUserProfileBinding.inflate(layoutInflater)
        setActivityContent(binding.root)

        sharedPref = getSharedPreferences("AuthPrefs", MODE_PRIVATE)
        userRepository = UserRepository(RetrofitClient.userService)

        val userId = sharedPref.getString("USER_ID", null)
        val token = sharedPref.getString("ACCESS_TOKEN", null)

        if (userId.isNullOrEmpty() || token.isNullOrEmpty()) {
            Toast.makeText(this, getString(R.string.user_not_authenticated), Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        CoroutineScope(Dispatchers.IO).launch {
            val user = userRepository.getUserById(userId, "Bearer $token")
            runOnUiThread {
                if (user != null) {
                    binding.tvUserName.text = "${getString(R.string.name)}: ${user.name}"
                    binding.tvUserEmail.text = "${getString(R.string.email)}: ${user.email}"
                    binding.tvUserRole.text = "${getString(R.string.role)}: ${user.userRole}"
                    binding.tvUserCreated.text = "${getString(R.string.registation_date)}: ${user.createdAt.take(10)}"
                } else {
                    Toast.makeText(this@UserProfileActivity, getString(R.string.error_fetch), Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
