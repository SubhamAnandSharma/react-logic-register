from random import randint
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
import re
from rest_framework import serializers
from django.contrib.auth import get_user_model # from .models import UserProfile

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    otp = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'otp']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    def validate(self, data):
        # Check if passwords match
        if data.get('password') != self.initial_data.get('c_password'):
            raise serializers.ValidationError("Passwords do not match")
        
        # Validate password using Django's built-in validators
        try:
            validate_password(data.get('password'))
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)

        # Additional custom password checks (if needed)
        # Check if password contains at least one special character
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\-]', data.get('password')):
            raise serializers.ValidationError("Password must contain at least one special character")
        
        # Check if password contains at least one uppercase letter
        if not any(char.isupper() for char in data.get('password')):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")
        
        # Check if password meets the length requirement
        if len(data.get('password')) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        
        # Check if username is valid
        username = data.get('username')
        if not re.match(r'^[a-zA-Z0-9]+$', username):
            raise serializers.ValidationError("Username can only contain letters and numbers")

        # Check if email is valid
        try:
            validate_email(data.get('email'))
        except ValidationError:
            raise serializers.ValidationError("Invalid email address")
        
        return data

    def create(self, validated_data):
        validated_data.pop('c_password', None)
        user = User.objects.create_user(**validated_data)
        # Generate and save OTP
        otp = generate_otp()
        user.otp = otp
        return user
    
    
def generate_otp():
    return str(randint(1000, 9999))

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

