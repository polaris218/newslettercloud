from rest_framework import serializers


class LoginSerializer(serializers.Serializer):

    email = serializers.CharField(write_only=True)
    password = serializers.CharField(max_length=128, style={'input_type': 'password'}, write_only=True)
