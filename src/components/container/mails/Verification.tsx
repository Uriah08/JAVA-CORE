import * as React from 'react';

interface VerificationTemplateProps {
  code: string;
}

export const VerificationTemplate: React.FC<Readonly<VerificationTemplateProps>> = ({
  code,
}) => (
  <div>
    <h1>Welcome to JAVA CONDITION, {code}!</h1>
  </div>
);