package com.pethouse.pethousemobile.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pethouse.pethousemobile.R
import com.pethouse.pethousemobile.models.Admin.SystemLog
import com.pethouse.pethousemobile.utils.DateTimeUtils // переконайся, що імпорт правильний

class LogsAdapter(private val logs: List<SystemLog>) : RecyclerView.Adapter<LogsAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val type: TextView = view.findViewById(R.id.logType)
        val message: TextView = view.findViewById(R.id.logMessage)
        val date: TextView = view.findViewById(R.id.logDate)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_log, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount() = logs.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val context = holder.itemView.context
        val currentLocale = context.resources.configuration.locales[0]
        val isEnglish = currentLocale.language == "en"

        val log = logs[position]
        holder.type.text = log.eventType
        holder.message.text = log.message
        holder.date.text = if (isEnglish) {
            DateTimeUtils.formatToUSDateTime(log.createdAt)
        } else {
            DateTimeUtils.formatIsoDateTime(log.createdAt)
        }
    }
}
