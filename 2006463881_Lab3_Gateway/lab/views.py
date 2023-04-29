from django.shortcuts import render
from rest_framework.views import APIView, status
from .serializers import PostSerializer
from rest_framework.response import Response
import requests
# Create your views here.
BASE_URL_POST= "https://django-server-production-680a.up.railway.app/api/post"
BASW_URL_QUOTE = "https://api.quotable.io"
class PostView(APIView):
    def get(self, request, *args, **kwargs):
        getAllPost = requests.get(BASE_URL_POST)
        getRandomQuote = requests.get(BASW_URL_QUOTE+"/random")
        if getAllPost.status_code == 200 and getRandomQuote.status_code == 200:
            postData = getAllPost.json()
            quoteData = getRandomQuote.json()
            return Response({"post": postData, "quote": quoteData}, status=status.HTTP_200_OK)
        return Response({'message':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if(serializer.is_valid()):
            data = serializer.data
            createPostRequest = requests.post(BASE_URL_POST, data=data)
            if createPostRequest.status_code == 200:
                getPostRequest = requests.get(BASE_URL_POST, params={"username":data.get("username")})
                if(getPostRequest.status_code == 200):
                    data = getPostRequest.json()
                    return Response(data, status=status.HTTP_201_CREATED)
            return Response({'message':'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR_)
        return Response({'message':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
