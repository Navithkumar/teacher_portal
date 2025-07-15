from django.core.cache import cache
from functools import wraps
from rest_framework.response import Response

def cache_response(timeout=60):
    def decorator(view_method):
        @wraps(view_method)
        def _wrapped_view(self, request, *args, **kwargs):
            user_key = request.user.id if request.user.is_authenticated else 'anon'
            cache_key = f"{request.get_full_path()}_{user_key}"

            # Try fetching from Redis
            cached_data = cache.get(cache_key)
            if cached_data:
                return Response(cached_data)

            # Call the original view method
            response = view_method(self, request, *args, **kwargs)

            # Store the response in cache
            cache.set(cache_key, response.data, timeout=timeout)
            return response
        return _wrapped_view
    return decorator
