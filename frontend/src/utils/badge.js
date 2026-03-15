import { Badge } from '../components/ui/badge.js';

/**
 * Status badge component - reusable
 * @param {string} status - 'pending'|'verified'|'rejected'|'expired'
 * @param {ReactNode} [children] - optional content
 */
export const StatusBadge = ({ status, children, ...props }) => {
  const variants = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20',
    verified: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20',
    expired: 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20'
  };

  return (
    <Badge variant="outline" className={variants[status] || variants.pending} {...props}>
      {children || status.toUpperCase()}
    </Badge>
  );
};

/**
 * Priority badge
 * @param {string} priority - 'low'|'medium'|'high'
 */
export const PriorityBadge = ({ priority, ...props }) => {
  const variants = {
    low: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    high: 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  return (
    <Badge variant="outline" className={variants[priority] || ''} {...props}>
      {priority.toUpperCase()}
    </Badge>
  );
};

