import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadMedia() {

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const convertToBase64 = (file) => {

    return new Promise((resolve) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {

        resolve(reader.result);

        };

    });

  };

  const handleFileChange = async (e) => {

    const selectedFiles =
        Array.from(e.target.files);

    const updatedFiles = [...files];

    for (const file of selectedFiles) {

        if (updatedFiles.length >= 5) break;

        const base64 =
        await convertToBase64(file);

        updatedFiles.push({

        name: file.name,

        type: file.type,

        preview: base64

        });

    }

    setFiles(updatedFiles);

    };

    const handleContinue = () => {

    localStorage.setItem(
        "uploadedMedia",
        JSON.stringify(files)
    );

    navigate("/extra-items");

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>
           Upload Device Photos / Videos
        </h1>

        <p
          style={{
            color:"white",
            textAlign:"center",
            marginBottom:"25px"
          }}
        >
          Help our technicians understand
          your issue better by uploading
          photos or a short video.
        </p>

        {/* Capture Photo */}

        <label className="upload-btn">

          📸 Capture Photo

          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleFileChange}
          />

        </label>

        {/* Record Video */}

        <label className="upload-btn">

          🎥 Record Video

          <input
            type="file"
            accept="video/*"
            capture="environment"
            hidden
            onChange={handleFileChange}
          />

        </label>

        <h3
          style={{
            color:"white",
            marginTop:"25px",
            textAlign:"center"
          }}
        >
          OR
        </h3>

        {/* Gallery */}

        <label className="upload-btn">

          📁 Upload from Gallery / Files

          <input
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={handleFileChange}
          />

        </label>

        {/* Preview */}

        <div className="preview-section">

            <h3
                style={{
                color:"white",
                textAlign:"center",
                marginBottom:"20px"
                }}
            >
                Uploaded Files ({files.length}/5)
            </h3>

            <div className="preview-grid">

                {files.map((item,index)=>(

                <div
                className="media-card"
                key={index}
                >
                    <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                        }
                    >
                        ✖
                    </button>

                    {
                        item.type.startsWith("image") ? (

                        <img
                            src={item.preview}
                            alt=""
                            className="preview-image"
                        />

                        ) : (

                        <video
                            controls
                            className="preview-video"
                        >
                            <source src={item.preview} />
                        </video>

                        )
                    }

                    <p className="media-name">
                        {item.name}
                    </p>

                </div>

                ))}

            </div>

        </div>

        <button
            onClick={handleContinue}
            style={{marginTop:"30px"}}
        >
        Continue
        </button>

      </div>

    </div>

  );

}

export default UploadMedia;