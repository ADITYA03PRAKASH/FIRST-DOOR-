import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Crown, 
  UserCheck, 
  Clock, 
  Users, 
  UserCog, 
  BookOpen, 
  FileSpreadsheet, 
  ShieldAlert, 
  BarChart3, 
  GraduationCap, 
  Heart, 
  Laptop,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Crown: Crown,
  UserCheck: UserCheck,
  Clock: Clock,
  Users: Users,
  UserGear: UserCog,
  BookOpen: BookOpen,
  FileInvoiceDollar: FileSpreadsheet,
  ShieldAlert: ShieldAlert,
  BarChart3: BarChart3,
  GraduationCap: GraduationCap,
  HeartPulse: Heart,
  Laptop: Laptop
};

const ServiceCard = ({ service, index }) => {
  const IconComponent = iconMap[service.icon] || Users;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.05 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gold/30 hover:shadow-premium transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      {/* Visual top border indicator */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      
      <div>
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-gold/5 text-gold flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-all duration-500">
          <IconComponent className="h-6 w-6" />
        </div>

        {/* Title */}
        <h3 className="font-headings font-bold text-xl text-navy mb-3 group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Action Link */}
      <Link 
        to={`/services#${service.id}`} 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors duration-300"
      >
        Learn More 
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

