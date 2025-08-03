import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from murf import Murf  # Import the Murf client library

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Get Murf API Key from environment variables
MURF_API_KEY = os.getenv("MURF_API_KEY")
if not MURF_API_KEY:
    raise ValueError("MURF_API_KEY not found in .env file or environment variables")

# Initialize the Murf client with your API key
try:
    client = Murf(api_key=MURF_API_KEY)
except Exception as e:
    raise RuntimeError(f"Failed to initialize Murf client: {e}. Check your API key.")


class TextToSpeechRequest(BaseModel):
    text: str
    # Use "en-US-natalie" as the default or allow it to be overridden
    voice_id: str = "en-US-natalie"
    # You can add more parameters here if Murf's generate method supports them,
    # like output_format, speed, pitch, etc., as per Murf client library docs.
    # For now, we'll stick to text and voice_id as per your snippet.

@app.post("/generate_audio/")
async def generate_audio(request_data: TextToSpeechRequest):
    """
    Accepts text, calls Murf's REST TTS API using the Murf client,
    and returns a URL to the generated audio file.
    """
    try:
        # Call the Murf text_to_speech.generate method
        response = await client.text_to_speech.generate(
            text=request_data.text,
            voice_id=request_data.voice_id
        )

        # The murf client should return the audio_file URL directly
        audio_url = response.audio_file

        if not audio_url:
            # This case might indicate an issue with the Murf client's response
            print(f"Murf client response did not contain 'audio_file': {response}")
            raise HTTPException(status_code=500, detail="Murf client did not return an audio URL.")

        return {"message": "Audio generated successfully!", "audio_url": audio_url}

    except Exception as e:
        # Catch any exceptions from the Murf client or network issues
        print(f"Error calling Murf API: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate audio: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Use 0.0.0.0 to make it accessible from other devices on the network,
    # or 127.0.0.1 for local access only.
    uvicorn.run(app, host="0.0.0.0", port=8000)