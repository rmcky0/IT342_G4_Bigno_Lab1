package com.example.miniapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.miniapp.data.RetrofitClient
import kotlinx.coroutines.launch

class UserViewModel : ViewModel() {
    fun fetchData() {
        viewModelScope.launch {
            try {
                val users = RetrofitClient.apiService.getUsers()
                // Do something with the list!
            } catch (e: Exception) {
                // Handle the error (e.g., backend is offline)
            }
        }
    }
}