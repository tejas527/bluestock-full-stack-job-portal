import React,{useState,useRef} from "react";
import { useCompanyContext } from "../../context/CompanyContext";
import CompanyRegistrationLayout from "../../Layout/CompanyRegistrationLayout";

const FileUpload = ({  description, onFileChange }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      onFileChange(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onDragOver = (e) => e.preventDefault();
  
  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-md p-6 text-center relative"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input type="file" ref={inputRef} onChange={onFileSelect} accept="image/*" className="hidden" />
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="mx-auto h-24 object-contain" />
          <button onClick={removeFile} className="mt-2 text-sm text-red-600 hover:text-red-800">Remove</button>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
             <ion-icon name="cloud-upload-outline" style={{fontSize: "35px", color: "gray"}}></ion-icon>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            <button onClick={() => inputRef.current.click()} className="font-semibold text-gray-700 hover:text-blue-700">Browse photo</button> or drop here
          </p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </>
      )}
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef();

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };
  
  const createLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      handleFormat('createLink', url);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="p-2 border-b border-gray-300 bg-gray-50 flex items-center space-x-4">
        <button onClick={() => handleFormat('bold')} className="font-bold">B</button>
        <button onClick={() => handleFormat('italic')} className="italic">I</button>
        <button onClick={() => handleFormat('underline')} className="underline">U</button>
        <button onClick={() => handleFormat('hiliteColor', 'yellow')} title="Highlight Text">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4a1 1 0 00-1 1v2.586l-6.293 6.293a1 1 0 101.414 1.414L10 8.414l5.879 5.879a1 1 0 101.414-1.414L11 6.586V5a1 1 0 00-1-1z"></path></svg>
        </button>
        <button onClick={createLink}>🔗</button>
        <button onClick={() => handleFormat('insertUnorderedList')}>&#8226;</button>
        <button onClick={() => handleFormat('insertOrderedList')}>1.</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="w-full p-3 h-32 resize-y focus:outline-none"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        placeholder={placeholder}
      ></div>
    </div>
  );
};

const Step1 = ({ onNext }) => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const handleNextClick = () => {
    const step1Data = {
      logo,
      banner,
      companyName,
      aboutUs,
    };
    onNext(step1Data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
      <h2 className="text-lg font-semibold mb-2">Logo & Banner Image</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
        <div className="md:col-span-1">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Upload Logo</h3>
          <FileUpload 
            onFileChange={setLogo}
            title="Upload Logo" 
            description="A photo larger than 400 pixels works best. Max photo size 5 MB." 
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Upload Banner</h3>
          <FileUpload 
            onFileChange={setBanner}
            title="Banner Image" 
            description="Banner images optimal dimension 1320x400. Supported formats: JPEG, PNG. Max photo size 5 MB." 
          />
        </div>
      </div>
      <hr className="mb-4 border-gray-300"/>
      <div className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
          <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="aboutUs" className="block text-sm font-medium text-gray-700 mb-1">About Us</label>
          <RichTextEditor placeholder="Write down about your company here..." />
        </div>
      </div>
      <div className="mt-8 flex justify-start">
        <button onClick={onNext} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 transition duration-300 flex items-center">
          Save & Next <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </div>
    </div>
  );
};

const Step2 = ({ onNext, onPrev }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"><option>Select...</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry Types</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"><option>Select...</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"><option>Select...</option></select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
          <div className="relative">
            <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
          <div className="relative">
            <input type="text" placeholder="Website url..." className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></span>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Vision</label>
        <RichTextEditor placeholder="Tell us about your company vision..." />
      </div>
      <div className="mt-8 flex justify-start space-x-4">
        <button onClick={onPrev} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-sm hover:bg-gray-300 transition duration-300">Previous</button>
        <button onClick={onNext} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 transition duration-300 flex items-center">Save & Next <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
      </div>
    </div>
  );
};

const SocialLinkInput = ({ label }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center space-x-2">
            <select className="p-3 border border-gray-300 rounded-lg bg-white w-1/3 appearance-none"><option>Facebook</option><option>Twitter</option></select>
            <input type="text" placeholder="Profile link/url..." className="w-full p-3 border border-gray-300 rounded-lg"/>
            <button className="p-3 text-gray-500 hover:text-red-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
        </div>
    </div>
);

const Step3 = ({ onNext, onPrev }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
        <div className="space-y-4">
            <SocialLinkInput label="Social Link 1" />
            <SocialLinkInput label="Social Link 2" />
            <SocialLinkInput label="Social Link 3" />
        </div>
        <div className="mt-6">
            <button className="w-full text-center py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 font-semibold hover:bg-gray-50 transition">+ Add New Social Link</button>
        </div>
        <div className="mt-8 flex justify-start space-x-4">
            <button onClick={onPrev} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-sm hover:bg-gray-300 transition">Previous</button>
            <button onClick={onNext} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 transition flex items-center">Save & Next <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
        </div>
    </div>
  );
};

const Step4 = ({ onNext, onPrev }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Map Location</label>
                <div className="relative">
                    <input type="text" className="w-full p-3 pl-10 border border-gray-300 rounded-lg" />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex items-center">
                    <select className="p-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 appearance-none"><option>🇧🇩 +880</option></select>
                    <input type="text" placeholder="Phone number..." className="w-full p-3 border border-gray-300 rounded-r-lg" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                    <input type="email" placeholder="Email address" className="w-full p-3 pl-10 border border-gray-300 rounded-lg" />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                </div>
            </div>
        </div>
        <div className="mt-8 flex justify-start space-x-4">
            <button onClick={onPrev} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-sm hover:bg-gray-300 transition">Previous</button>
            <button onClick={onNext} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 transition flex items-center">Finish Editing <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
        </div>
    </div>
  );
};

const Step5 = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full text-center">
        <div className="flex justify-center items-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
                <div className="bg-blue-200 rounded-full p-3">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
            </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎉 Congratulations, Your profile is 100% complete!</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">Donec hendrerit, ante mattis pellentesque eleifend, tortor urna malesuada ante, eget aliquam nulla augue hendrerit ligula.</p>
        <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-6 rounded-sm hover:bg-blue-50 transition">View Dashboard</button>
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-sm hover:bg-blue-700 transition flex items-center">Post Job <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
        </div>
    </div>
  );
};

const Registration = () => {
  const { formData, setFormData } = useCompanyContext();
  const [step, setStep] = useState(1);

  const handleNext = (newData) => {
    setFormData({ ...formData, ...newData });
    setStep((prev) => Math.min(prev + 1, 5)); 
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1)); 
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 onNext={handleNext} />;
      case 2: return <Step2 onNext={handleNext} onPrev={handlePrev} />;
      case 3: return <Step3 onNext={handleNext} onPrev={handlePrev} />;
      case 4: return <Step4 onNext={handleNext} onPrev={handlePrev} />;
      case 5: return <Step5 />;
      default: return <Step1 onNext={handleNext} />;
    }
  };

  return (
    <CompanyRegistrationLayout currentStep={step}>
      {renderStep()}
    </CompanyRegistrationLayout>
  );
};

export default Registration;
