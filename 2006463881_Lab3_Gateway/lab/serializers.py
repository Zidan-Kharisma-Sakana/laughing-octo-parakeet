from rest_framework import serializers
class PostSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=12, min_length=1)
    title = serializers.CharField(max_length=50, min_length=1)
    content = serializers.CharField(max_length=None, min_length=1)