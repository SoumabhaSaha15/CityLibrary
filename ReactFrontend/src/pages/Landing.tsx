import React from "react";
import { BiBook, BiSearch, BiTime, BiStats } from "react-icons/bi";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaSun, FaMoon, FaBookOpen, FaUserFriends, FaChartLine } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { MdLibraryBooks, MdEventAvailable, MdSecurity } from "react-icons/md";
import { useTheme } from "@heroui/use-theme";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Chip,
  Avatar,
  Divider,
} from "@heroui/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const menuItems = ['Features', 'Customers', 'Integrations', 'Login'];

  const features = [
    {
      icon: <MdLibraryBooks className="text-4xl" />,
      title: "Digital Catalog",
      description: "Browse thousands of books with our comprehensive digital catalog system"
    },
    {
      icon: <BiSearch className="text-4xl" />,
      title: "Smart Search",
      description: "Find any book instantly with our advanced search and filtering options"
    },
    {
      icon: <MdEventAvailable className="text-4xl" />,
      title: "Easy Reservations",
      description: "Reserve books online and get notified when they're ready for pickup"
    },
    {
      icon: <BiTime className="text-4xl" />,
      title: "Auto Renewals",
      description: "Never worry about late fees with automatic renewal notifications"
    },
    {
      icon: <BiStats className="text-4xl" />,
      title: "Reading Analytics",
      description: "Track your reading progress and get personalized recommendations"
    },
    {
      icon: <MdSecurity className="text-4xl" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security measures"
    }
  ];

  const stats = [
    { value: "50K+", label: "Books Available", icon: <FaBookOpen /> },
    { value: "10K+", label: "Active Members", icon: <FaUserFriends /> },
    { value: "95%", label: "Satisfaction Rate", icon: <FaChartLine /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Member",
      avatar: "SJ",
      comment: "CityLibrary has transformed how I discover and enjoy books. The reservation system is incredibly convenient!"
    },
    {
      name: "Michael Chen",
      role: "Student",
      avatar: "MC",
      comment: "As a student, having access to such a vast digital catalog has been invaluable for my research."
    },
    {
      name: "Emily Rodriguez",
      role: "Book Club Organizer",
      avatar: "ER",
      comment: "The analytics feature helps me find perfect recommendations for our monthly book club meetings."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            icon={isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <BiBook size={24} />
            <p className="font-bold text-inherit ml-2">CityLibrary</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.slice(0, 3).map((item, index) => (
            <NavbarItem key={index}>
              <Link href="#" color="foreground">
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat" size="sm">
              Sign Up
            </Button>
          </NavbarItem>
          <Button
            variant="light"
            radius="full"
            size="sm"
            isIconOnly={true}
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </Button>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Chip
                startContent={<HiSparkles />}
                variant="flat"
                color="primary"
              >
                Welcome to the Future of Reading
              </Chip>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Gateway to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Endless Knowledge
                </span>
              </h1>
              <p className="text-lg text-default-600">
                Discover, reserve, and manage your reading journey with our modern library management system. Access thousands of books, track your progress, and join a thriving community of readers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  color="primary"
                  size="lg"
                  endContent={<HiLightningBolt />}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  startContent={<BiBook />}
                >
                  Browse Catalog
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-default-500">
                <span>✓ No credit card required</span>
                <span>•</span>
                <span>✓ 14-day free trial</span>
              </div>
            </div>
            <div className="relative">
              <Card className="p-4">
                <CardBody>
                  <Input
                    placeholder="Search for books, authors, or topics..."
                    startContent={<BiSearch className="text-2xl text-default-400" />}
                    size="lg"
                    variant="bordered"
                  />
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-semibold">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      <Chip size="sm" variant="flat">Fiction</Chip>
                      <Chip size="sm" variant="flat">Science</Chip>
                      <Chip size="sm" variant="flat">History</Chip>
                      <Chip size="sm" variant="flat">Technology</Chip>
                      <Chip size="sm" variant="flat">Biography</Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-default-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardBody className="py-8">
                  <div className="flex justify-center mb-4 text-primary text-3xl">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-default-600">{stat.label}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Chip color="primary" variant="flat" className="mb-4">
              Features
            </Chip>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Manage Your Library
            </h2>
            <p className="text-lg text-default-600 max-w-2xl mx-auto">
              Our comprehensive platform offers all the tools you need for a seamless library experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex gap-3">
                  <div className="text-primary">{feature.icon}</div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{feature.title}</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-default-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Chip color="secondary" variant="flat" className="mb-4">
              Testimonials
            </Chip>
            <h2 className="text-4xl font-bold mb-4">
              Loved by Thousands of Readers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardBody className="space-y-4">
                  <p className="text-default-600 italic">"{testimonial.comment}"</p>
                  <Divider />
                  <div className="flex items-center gap-3">
                    <Avatar name={testimonial.avatar} color="primary" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-default-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600">
            <CardBody className="text-center py-16 px-6">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Reading Journey?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of readers who have transformed their library experience with CityLibrary
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-primary font-semibold"
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-white text-white"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-default-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BiBook size={24} />
                <span className="font-bold text-lg">CityLibrary</span>
              </div>
              <p className="text-sm text-default-600">
                Empowering readers with modern library management solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm">
                <Link href="#" color="foreground">Features</Link>
                <Link href="#" color="foreground">Pricing</Link>
                <Link href="#" color="foreground">API</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <Link href="#" color="foreground">About</Link>
                <Link href="#" color="foreground">Blog</Link>
                <Link href="#" color="foreground">Careers</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <Link href="#" color="foreground">Help Center</Link>
                <Link href="#" color="foreground">Contact</Link>
                <Link href="#" color="foreground">Status</Link>
              </div>
            </div>
          </div>
          <Divider className="my-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-default-500">
            <p>© 2025 CityLibrary. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" color="foreground" size="sm">Privacy</Link>
              <Link href="#" color="foreground" size="sm">Terms</Link>
              <Link href="#" color="foreground" size="sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}