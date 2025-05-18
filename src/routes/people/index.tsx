import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import peopleBackground from "@/assets/people.png"
import type { PersonProps } from "@/lib/types";
import { motion } from "framer-motion"

export default function People() {
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})
    const { members, isLoading } = useLoaderData() as { members: PersonProps[], isLoading: boolean };

    const handleImageError = (memberId: string) => {
        setImageErrors(prev => ({ ...prev, [memberId]: true }))
    }

    const staff = members.filter((member) => member.isStaff)
    const core = members.filter((member) => member.isCore)
    const studentMembers = members.filter((member) => !member.isStaff && !member.isCore)

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    }

    const MemberImage = ({ member }: { member: PersonProps }) => (
        <motion.div 
            className="w-[150px] h-[150px] bg-gray-200 rounded-sm overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {!imageErrors[member.id] ? (
                <motion.img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={() => handleImageError(member.id)}
                />
            ) : (
                <motion.div 
                    className="w-full h-full flex items-center justify-center text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-sm">No Image</span>
                </motion.div>
            )}
        </motion.div>
    )

    return (
        <div className="w-full h-full overflow-hidden">
            <motion.img 
                src={peopleBackground} 
                alt="People" 
                className="w-full h-auto object-cover max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
            <div className="flex flex-col px-[10%] py-[5%]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p className="text-lg">Staff</p>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 pt-7 pb-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {staff?.map((member) => {
                            return (
                                <motion.div 
                                    key={member.id} 
                                    className="flex flex-col justify-center items-center"
                                    variants={itemVariants}
                                >
                                    <MemberImage member={member} />
                                    <motion.p 
                                        className="mt-2 font-medium text-sm"
                                        variants={itemVariants}
                                    >
                                        {member.name}
                                    </motion.p>
                                    <motion.div 
                                        className="flex flex-wrap gap-1 justify-center pt-1 px-10"
                                        variants={itemVariants}
                                    >
                                        {member.roles.map((role) => <motion.p className="bg-gray-200 rounded-sm px-2 py-0.5 text-[10px]" key={role}>{role}</motion.p>)}
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <p className="text-lg">Student Leadership</p>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 pt-7 pb-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {core?.map((member) => {
                            return (
                                <motion.div 
                                    key={member.id} 
                                    className="flex flex-col justify-center items-center"
                                    variants={itemVariants}
                                >
                                    <MemberImage member={member} />
                                    <motion.p 
                                        className="mt-2 font-medium text-sm"
                                        variants={itemVariants}
                                    >
                                        {member.name}
                                    </motion.p>
                                    <motion.div 
                                        className="flex flex-wrap gap-1 justify-center pt-1 px-10"
                                        variants={itemVariants}
                                    >
                                        {member.roles.map((role) => <motion.p className="bg-gray-200 rounded-sm px-2 py-0.5 text-[10px]" key={role}>{role}</motion.p>)}
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p className="text-lg">Student Members</p>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 pt-7"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {studentMembers?.map((member) => {
                            return (
                                <motion.div 
                                    key={member.id} 
                                    className="flex flex-col justify-center items-center"
                                    variants={itemVariants}
                                >
                                    <MemberImage member={member} />
                                    <motion.p 
                                        className="mt-2 font-medium text-sm"
                                        variants={itemVariants}
                                    >
                                        {member.name}
                                    </motion.p>
                                    <motion.div 
                                        className="flex flex-wrap gap-1 justify-center pt-1 px-10"
                                        variants={itemVariants}
                                    >
                                        {member.roles.map((role) => <motion.p className="bg-gray-200 rounded-sm px-2 py-0.5 text-[10px]" key={role}>{role}</motion.p>)}
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}