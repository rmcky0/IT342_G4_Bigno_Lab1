package com.example.miniapp.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.miniapp.R

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val tvGoToRegister = findViewById<TextView>(R.id.tvGoToRegister)

        btnLogin.setOnClickListener {
            val email = etEmail.text.toString()
            val password = etPassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                // Here is where you would call your ViewModel/Retrofit logic
                // For now, we simulate a successful login
                Toast.makeText(this, "Logging in...", Toast.LENGTH_SHORT).show()

                val intent = Intent(this, DashboardActivity::class.java)
                startActivity(intent)
                finish() // Closes Login so user can't "Go Back" to it
            } else {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            }
        }

        tvGoToRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }
}