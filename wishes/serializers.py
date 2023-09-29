from rest_framework import serializers
from .models import Wish

class WishSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.owner

    class Meta:
        model = Wish
        fields = [
            'id', 'owner', 'is_owner', 'created_at', 'title',
            'price', 'description', 'purchase_link', 'is_fulfilled',
        ]
