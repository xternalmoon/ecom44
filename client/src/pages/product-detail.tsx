import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, Star, ShoppingCart, Truck, RotateCcw, Shield, Plus, Minus, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Product } from "@shared/schema";
import type { ReviewWithUser } from "@/types";

// ReviewForm component
function ReviewForm({ productId, onReviewAdded }: { productId: number, onReviewAdded: () => void }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/reviews", {
        productId,
        rating,
        title,
        comment
      });
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
      });
      setRating(0);
      setTitle("");
      setComment("");
      onReviewAdded();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please Log In",
          description: "You need to be logged in to leave a review.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit review. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className="space-y-4">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-baby-primary mb-2">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-medium text-baby-primary mb-2">Title (optional)</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your review"
          maxLength={100}
        />
      </div>

      {/* Review Comment */}
      <div>
        <label className="block text-sm font-medium text-baby-primary mb-2">Review</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience with this product"
          rows={4}
          maxLength={500}
        />
      </div>

      <Button
        onClick={() => submitReviewMutation.mutate()}
        disabled={rating === 0 || submitReviewMutation.isPending}
        className="bg-baby-primary hover:bg-baby-primary/90"
      >
        {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const productId = params?.id ? parseInt(params.id) : null;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
  });

  const { data: reviews } = useQuery<ReviewWithUser[]>({
    queryKey: ["/api/products", productId, "reviews"],
    enabled: !!productId,
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
  });

  // Set default size and color when product loads
  useEffect(() => {
    if (product && !selectedSize && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && !selectedColor && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedSize, selectedColor]);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart/add", {
        productId: product!.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        price: product!.price,
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: `${quantity} ${product?.name}(s) added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/wishlist", {
        productId: product!.id,
      });
    },
    onSuccess: () => {
      setIsInWishlist(true);
      toast({
        title: "Added to Wishlist",
        description: "Product has been added to your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to wishlist.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCartMutation.mutate();
  };

  const handleWishlistClick = () => {
    addToWishlistMutation.mutate();
  };

  const buyNowMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart/add", {
        productId: product!.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        price: product!.price,
      });
    },
    onSuccess: () => {
      toast({
        title: "Redirecting to Checkout",
        description: `${quantity} ${product?.name}(s) added to cart. Redirecting...`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      // Redirect to checkout page after a brief delay
      setTimeout(() => {
        setLocation("/checkout");
      }, 1000);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    },
  });

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select size and color before purchasing.",
        variant: "destructive",
      });
      return;
    }
    buyNowMutation.mutate();
  };

  if (!productId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-baby-primary mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-96"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-baby-primary mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const averageRating = reviews && reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images with Carousel */}
        <div className="space-y-4">
          {/* Main Image with Navigation */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={currentImageIndex === 0 
                ? product.imageUrl || "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                : product.referenceImages?.[currentImageIndex - 1] || product.imageUrl || "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
              }
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.isFeatured && (
              <Badge className="absolute top-4 left-4 bg-baby-green text-white">
                Bestseller
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                Sale
              </Badge>
            )}
            
            {/* Navigation Arrows */}
            {product.referenceImages && product.referenceImages.length > 0 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? (product.referenceImages?.length || 0) : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-baby-primary" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev >= (product.referenceImages?.length || 0) ? 0 : prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-baby-primary" />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {product.referenceImages && product.referenceImages.length > 0 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1} / {(product.referenceImages?.length || 0) + 1}
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          {product.referenceImages && product.referenceImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              <img
                src={product.imageUrl || ""}
                alt={`${product.name} main`}
                onClick={() => setCurrentImageIndex(0)}
                className={`w-full h-20 object-cover rounded-lg border-2 cursor-pointer hover:border-baby-accent transition-colors ${
                  currentImageIndex === 0 ? "border-baby-primary" : "border-gray-200"
                }`}
              />
              {product.referenceImages.map((imageUrl, index) => (
                <img
                  key={index + 1}
                  src={imageUrl}
                  alt={`${product.name} view ${index + 2}`}
                  onClick={() => setCurrentImageIndex(index + 1)}
                  className={`w-full h-20 object-cover rounded-lg border-2 cursor-pointer hover:border-baby-accent transition-colors ${
                    index + 1 === currentImageIndex ? "border-baby-primary" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-baby-primary mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({reviews?.length || 0} reviews)
                </span>
              </div>
              <Badge variant="outline" className="text-baby-primary">
                {product.ageGroup.replace("-", "-").replace("months", " Months")}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-baby-primary">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">৳{product.originalPrice}</span>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-baby-primary mb-3">Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className={`${
                    selectedSize === size ? "bg-baby-accent text-white" : ""
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-baby-primary mb-3">Color</h3>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-baby-primary mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addToCartMutation.isPending}
              className="w-full bg-baby-accent hover:bg-blue-600 text-white py-3 text-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
            
            <Button
              onClick={handleBuyNow}
              disabled={product.stock === 0 || buyNowMutation.isPending}
              className="w-full bg-baby-green hover:bg-green-600 text-white py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              {buyNowMutation.isPending ? "Processing..." : "Buy Now"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleWishlistClick}
              disabled={addToWishlistMutation.isPending}
              className="w-full border-baby-accent text-baby-accent hover:bg-baby-accent hover:text-white"
            >
              <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current" : ""}`} />
              {addToWishlistMutation.isPending ? "Adding..." : "Add to Wishlist"}
            </Button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-baby-green" />
              <span className="text-sm text-gray-600">100% Organic Cotton</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-baby-accent" />
              <span className="text-sm text-gray-600">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">7 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details and Reviews */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-baby-primary mb-4">Product Details</h3>
                <div className="prose max-w-none text-gray-600">
                  <p>{product.description}</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>SKU:</strong> {product.sku}</p>
                    <p><strong>Available Sizes:</strong> {product.sizes.join(", ")}</p>
                    <p><strong>Available Colors:</strong> {product.colors.join(", ")}</p>
                    <p><strong>Age Group:</strong> {product.ageGroup.replace("-", "-").replace("months", " Months")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-baby-accent rounded-full flex items-center justify-center text-white font-semibold">
                            {review.user.firstName?.[0] || review.user.email?.[0] || "U"}
                          </div>
                          <div>
                            <h4 className="font-semibold text-baby-primary">
                              {review.user.firstName && review.user.lastName 
                                ? `${review.user.firstName} ${review.user.lastName}`
                                : review.user.email}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {review.isVerified && (
                          <Badge variant="secondary" className="bg-baby-green text-white">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      
                      {review.title && (
                        <h5 className="font-medium text-baby-primary mt-4">{review.title}</h5>
                      )}
                      
                      {review.comment && (
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                  </CardContent>
                </Card>
              )}
              
              {/* Add Review Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-baby-primary mb-4">Write a Review</h3>
                  <ReviewForm productId={product.id} onReviewAdded={() => {
                    queryClient.invalidateQueries({ queryKey: ["/api/products", productId, "reviews"] });
                  }} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
