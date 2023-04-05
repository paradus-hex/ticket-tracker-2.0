import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

export interface User {
  name: string;
  email: string;
  image: string;
  role: "ADMIN" | "USER";
}

interface UserCardProps {
  user: User;
}

const CustomCard = styled(Card)`
  width: 345px;
  margin: 1rem;
`;

const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
`;

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { name, email, image, role } = user;

  return (
    <CustomCard className="shadow-lg">
      <CustomCardContent>
        <CustomAvatar src={image} alt={name} />
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body1" color="text.primary" className="mt-2">
          Role: {role}
        </Typography>
      </CustomCardContent>
    </CustomCard>
  );
};

export default UserCard;
