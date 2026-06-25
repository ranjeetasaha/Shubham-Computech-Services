import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadMedia() {

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);

    const updatedFiles = [...files];

    selectedFiles.forEach((file) => {

        if (updatedFiles.length >= 5) return;

        updatedFiles.push({

        file,

        preview: URL.createObjectURL(file)

        });

    });

    setFiles(updatedFiles);

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
                        className="remove-btn"
                        onClick={()=>{
                            setFiles(files.filter((_,i)=>i!==index));
                        }}
                    >
                    ✖
                    </button>


                    {item.file.type.startsWith("image")

                    ?

                    <img
                    src={item.preview}
                    alt=""
                    className="preview-image"
                    />

                    :

                    <video
                    controls
                    className="preview-video"
                    >
                    <source
                        src={item.preview}
                    />
                    </video>

                    }

                    <p className="media-name">
                        {item.file.name}
                    </p>

                </div>

                ))}

            </div>

        </div>

        <button
          onClick={() => navigate("/extra-items")}
          style={{marginTop:"30px"}}
        >
          Continue
        </button>

      </div>

    </div>

  );

}

export default UploadMedia;