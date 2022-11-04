import { IndeedJob } from '../../../lib/api';

export interface JobCardProps extends IndeedJob {}

export const JobCard: React.FC<JobCardProps> = ({
  id,
  company,
  title,
  type,
  location,
  salary,
  description,
  job_position,
}) => (
  <div>
    {/* image */}
    <div>
      <h2>{company}</h2>
      <h3>{title}</h3>
      <span>{type}</span>
      <div>
        <span>{location}</span>
        <span>{created_at}</span>
      </div>
    </div>
  </div>
);
