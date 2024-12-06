import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const teamMembers = [
    {
        name: "Nischal Chhukan",
        role: "Team Leader",
        image: "https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/465576578_1911911085961013_8876150643240261015_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XL-ugwroyo0Q7kNvgF0fQru&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=A__jfQaonGL4flNY4eyfsPw&oh=00_AYAWaJHYnnmqu841vfhZYZu05EiwR6Rga-150rYMU-4u5A&oe=67586EEB",
        initials: "NC",
        link: 'https://www.facebook.com/nischal.chhukan.3/'
    },
    {
        name: "Prasun Phoju",
        role: "Database Manager",
        image: "https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-1/465977881_1593472174853838_1858774843328258225_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=eqcOTPJ88yQQ7kNvgE61ObN&_nc_zt=24&_nc_ht=scontent.fktm7-1.fna&_nc_gid=AFq1J1S4itugSo3kGpIsEuE&oh=00_AYCI2d5x1GF89tglCNIpQsW6N50R-4KRnAea8wodgbnjBA&oe=67589331",
        initials: "PP",
        link:'https://www.facebook.com/pra12345678910'
    },
    {
        name: "Ankit Gosain",
        role: "Database Manager",
        image: "https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-1/438159822_122102778890303620_5582818188251910407_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=4CIANbpYlRwQ7kNvgHpH6AO&_nc_zt=24&_nc_ht=scontent.fktm7-1.fna&_nc_gid=Azsc_snKcldCItHxBUo4yPo&oh=00_AYCIrDt98oVHOf4IC2TGBvJT-T52stRMdfd9Bh9smwmxWQ&oe=6758727C",
        initials: "AG",
        link: 'https://www.facebook.com/profile.php?id=61559108616108'
    },
    {
        name: "Spandan Khyaju",
        role: "Database Manager",
        image: "https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-1/449488131_1001663034922092_1691430870433042165_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=m9mA8rCYyw4Q7kNvgHAP-dz&_nc_zt=24&_nc_ht=scontent.fktm7-1.fna&_nc_gid=AbNYVH5p5a8hRL3azhsOGz0&oh=00_AYAYss1yqKQw5LHicZ13ih3qSpw3XfB2tuvLBjWh3B6_2A&oe=6758ADAF",
        initials: "SK",
        link: 'https://www.facebook.com/spandan.khyaju'
    },
    {
        name: "Dhawa Chiring Tamang",
        role: "Database Manager",
        image: "/placeholder.svg?height=100&width=100",
        initials: "DCT",
        link: ''
    }
]

export default function AboutUs() {
    return (
        <div className="container mx-auto py-12">

            <h1 className="text-4xl font-bold text-center mb-12">Meet Our Exceptional Team</h1>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                We are a dynamic group of professionals dedicated to delivering innovative solutions and exceeding client expectations. Our diverse skills and collaborative spirit drive our success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <Link href={member.link|| ''}>
                        <Card key={member.name} className="overflow-hidden transition-all hover:shadow-lg">
                            <CardHeader className="p-0">
                                <div className="h-32 bg-gradient-to-r from-primary to-primary-foreground" />
                            </CardHeader>
                            <CardContent className="pt-0 text-center">
                                <Avatar className="w-24 h-24 border-4 border-background -mt-12 mx-auto">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="mt-4 mb-1">{member.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

