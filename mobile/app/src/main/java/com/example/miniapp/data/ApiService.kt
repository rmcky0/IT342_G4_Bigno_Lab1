package com.example.miniapp.data

import com.example.miniapp.model.User
import retrofit2.http.GET

interface ApiService {
    @GET("api/users") // This matches your Spring Boot @GetMapping
    suspend fun getUsers(): List<User>
}