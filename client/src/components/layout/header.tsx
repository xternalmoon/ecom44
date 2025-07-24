import { useState } from "react";
import { Link, useLocation } from "wouter";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [location] = useLocation();

  const { data: cartData } = useQuery({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  const cartItemsCount = (cartData as any)?.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-cyan-500 text-white text-center py-2 text-sm">
        <p>Free shipping on orders over ৳5000 • 30-day returns • Organic cotton guarantee</p>
      </div>

      {/* Main Navigation */}
      <header className="backdrop-blur-xl border-b border-white/10 sticky top-0 z-50" style={{backgroundColor: 'rgba(4, 99, 15, 0.7)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Baby Plus</h1>
                <p className="text-xs text-gray-200 -mt-1">Premium Baby Clothing</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`text-white hover:text-cyan-400 font-medium transition-colors ${
                  location === "/" ? "text-cyan-400" : ""
                }`}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className={`text-white hover:text-cyan-400 font-medium transition-colors ${
                  location === "/shop" ? "text-cyan-400" : ""
                }`}
              >
                Shop
              </Link>
              <Link 
                href="/profile" 
                className={`text-white hover:text-cyan-400 font-medium transition-colors ${
                  location === "/profile" ? "text-cyan-400" : ""
                }`}
              >
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link 
                  href="/admin" 
                  className={`text-white hover:text-cyan-400 font-medium transition-colors ${
                    location === "/admin" ? "text-cyan-400" : ""
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="text-white hover:text-cyan-400">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-white hover:text-cyan-400">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="secondary"
                      className="absolute -top-2 -right-2 bg-baby-accent text-white h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden text-white hover:text-cyan-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 backdrop-blur-xl" style={{backgroundColor: 'rgba(4, 99, 15, 0.7)'}}>
            <div className="px-4 py-3 space-y-3">
              <Link 
                href="/" 
                className="block text-white hover:text-cyan-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="block text-white hover:text-cyan-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/profile" 
                className="block text-white hover:text-cyan-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link 
                  href="/admin" 
                  className="block text-white hover:text-cyan-400 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <div className="pt-2 border-t border-green-400">
                <Button 
                  onClick={async () => {
                    const response = await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "include"
                    });
                    if (response.ok) {
                      window.location.href = "/";
                    }
                  }}
                  variant="outline"
                  className="w-full text-black border-white hover:bg-white hover:text-baby-green hover:border-white transition-all duration-200"
                  style={{ color: 'black' }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
