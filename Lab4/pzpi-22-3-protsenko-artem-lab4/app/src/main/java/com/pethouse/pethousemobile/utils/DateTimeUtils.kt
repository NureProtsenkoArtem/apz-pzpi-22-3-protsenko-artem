package com.pethouse.pethousemobile.utils

import java.text.SimpleDateFormat
import java.util.*

object DateTimeUtils {
    fun formatIsoDateTime(input: String): String {
        return try {
            val cleanInput = input.split(".")[0]
            val parser = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val formatter = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.getDefault())
            val date = parser.parse(cleanInput)
            date?.let { formatter.format(it) } ?: input
        } catch (e: Exception) {
            input
        }
    }

    fun formatToUSDateTime(input: String): String {
        return try {
            val cleanInput = input.split(".")[0]
            val parser = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val usFormatter = SimpleDateFormat("MM/dd/yyyy hh:mm a", Locale.US)
            val date = parser.parse(cleanInput)
            date?.let { usFormatter.format(it) } ?: input
        } catch (e: Exception) {
            input
        }
    }
}
