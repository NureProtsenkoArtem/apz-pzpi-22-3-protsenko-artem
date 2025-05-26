package com.pethouse.pethousemobile.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Spinner
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.pethouse.pethousemobile.R
import com.pethouse.pethousemobile.models.Auth.User

class UserAdapter(
    private val onUpdateClick: (String, String) -> Unit
) : ListAdapter<User, UserAdapter.UserViewHolder>(DiffCallback()) {

    class UserViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val name: TextView = view.findViewById(R.id.textName)
        val email: TextView = view.findViewById(R.id.textEmail)
        val role: TextView = view.findViewById(R.id.textRole)
        val spinner: Spinner = view.findViewById(R.id.roleSpinner)
        val button: Button = view.findViewById(R.id.buttonUpdateRole)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_user, parent, false)
        return UserViewHolder(view)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val user = getItem(position)
        holder.name.text = user.name
        holder.email.text = user.email
        holder.role.text = "${R.string.current_role} ${user.userRole}"
        holder.spinner.setSelection(
            holder.spinner.resources.getStringArray(R.array.user_roles).indexOf(user.userRole)
        )
        holder.button.setOnClickListener {
            val newRole = holder.spinner.selectedItem.toString()
            onUpdateClick(user.userId, newRole)
        }
    }

    class DiffCallback : DiffUtil.ItemCallback<User>() {
        override fun areItemsTheSame(old: User, newItem: User) = old.userId == newItem.userId
        override fun areContentsTheSame(old: User, newItem: User) = old == newItem
    }
}
