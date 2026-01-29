import { useState } from 'react';
import svgPaths from '../imports/svg-gnkyh60uzt';
import { Mail, FileText, Shield } from 'lucide-react';

interface AccountInformationProps {
  onBack: () => void;
  onEmailUs: () => void;
  onTermsConditions: () => void;
  onPrivacyPolicy: () => void;
  onDeleteAccount: () => void;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3152c100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]"
      data-name="Back"
    >
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </button>
  );
}

function DefaultButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[#ff232f] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[47px] px-[20px] py-[10px] rounded-[20px] top-[597.02px] w-[300px]"
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#ff232f] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-white text-[22px] text-center w-[242px]">DELETE ACCOUNT</p>
    </button>
  );
}

function DefaultButton1({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[279.02px] w-[300px]"
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="flex items-center gap-[12px]">
        <FileText className="w-[24px] h-[24px] text-[#1e1e1e] shrink-0" />
        <p className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1e1e1e] text-[22px]">{`TERMS & CONDITIONS`}</p>
      </div>
    </button>
  );
}

function DefaultButton2({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[194.02px] w-[300px]"
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="flex items-center gap-[12px]">
        <Mail className="w-[24px] h-[24px] text-[#1e1e1e] shrink-0" />
        <p className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1e1e1e] text-[22px]">EMAIL US</p>
      </div>
    </button>
  );
}

function DefaultButton3({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[364.02px] w-[300px]"
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="flex items-center gap-[12px]">
        <Shield className="w-[24px] h-[24px] text-[#1e1e1e] shrink-0" />
        <p className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1e1e1e] text-[22px]">PRIVACY POLICY</p>
      </div>
    </button>
  );
}

function BoldDuotoneTextFormattingTextSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Bold Duotone / Text Formatting / Text Square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3d0bf80} fill="#100F0F" />
          <path d={svgPaths.p32efad00} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function TextField() {
  const [email, setEmail] = useState('user@example.com');
  
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[47px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[0.02px] w-[300px]" data-name="TEXT FIELD">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <BoldDuotoneTextFormattingTextSquare />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[210px] bg-transparent border-none outline-none"
      />
    </div>
  );
}

function BoldDuotoneTextFormattingTextSquare1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Bold Duotone / Text Formatting / Text Square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3d0bf80} fill="#100F0F" />
          <path d={svgPaths.p32efad00} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function TextField1() {
  const [password, setPassword] = useState('MyPassword123');
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[47px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[85.02px] w-[300px]" data-name="TEXT FIELD">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <BoldDuotoneTextFormattingTextSquare1 />
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[150px] bg-transparent border-none outline-none"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="relative shrink-0 size-[24px] z-10"
        type="button"
      >
        {showPassword ? (
          <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        )}
      </button>
    </div>
  );
}

function Container({ 
  onEmailUs, 
  onTermsConditions, 
  onPrivacyPolicy, 
  onDeleteAccount 
}: { 
  onEmailUs: () => void;
  onTermsConditions: () => void;
  onPrivacyPolicy: () => void;
  onDeleteAccount: () => void;
}) {
  return (
    <div className="absolute h-[741px] left-0 top-[112px] w-[394px]" data-name="Container">
      <DefaultButton onClick={onDeleteAccount} />
      <DefaultButton1 onClick={onTermsConditions} />
      <DefaultButton2 onClick={onEmailUs} />
      <DefaultButton3 onClick={onPrivacyPolicy} />
      <TextField />
      <TextField1 />
    </div>
  );
}

function HomeFeed({ 
  onBack, 
  onEmailUs, 
  onTermsConditions, 
  onPrivacyPolicy, 
  onDeleteAccount 
}: { 
  onBack: () => void;
  onEmailUs: () => void;
  onTermsConditions: () => void;
  onPrivacyPolicy: () => void;
  onDeleteAccount: () => void;
}) {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Back onClick={onBack} />
      <Container 
        onEmailUs={onEmailUs}
        onTermsConditions={onTermsConditions}
        onPrivacyPolicy={onPrivacyPolicy}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}

function Container1({ 
  onBack, 
  onEmailUs, 
  onTermsConditions, 
  onPrivacyPolicy, 
  onDeleteAccount 
}: { 
  onBack: () => void;
  onEmailUs: () => void;
  onTermsConditions: () => void;
  onPrivacyPolicy: () => void;
  onDeleteAccount: () => void;
}) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed 
          onBack={onBack}
          onEmailUs={onEmailUs}
          onTermsConditions={onTermsConditions}
          onPrivacyPolicy={onPrivacyPolicy}
          onDeleteAccount={onDeleteAccount}
        />
      </div>
    </div>
  );
}

export default function AccountInformation({ 
  onBack, 
  onEmailUs, 
  onTermsConditions, 
  onPrivacyPolicy, 
  onDeleteAccount 
}: AccountInformationProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Account">
      <Container1 
        onBack={onBack}
        onEmailUs={onEmailUs}
        onTermsConditions={onTermsConditions}
        onPrivacyPolicy={onPrivacyPolicy}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}