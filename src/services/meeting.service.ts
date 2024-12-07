export const createMeeting = async (): Promise<void> => {
  const url = "https://api.dyte.io/v2/meetings";
  const apiString = `
  ${import.meta.env.VITE_DYTE_ORG_ID}:${import.meta.env.VITE_DYTE_API_KEY}
`;
  const encodedApiKey = btoa(apiString);
  console.log("encodedApiKey", encodedApiKey);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${encodedApiKey}`,
      },
      body: JSON.stringify({
        title: "newMeeting",
        preferred_region: "eu-central-1",
        record_on_start: false,
        live_stream_on_start: false,
        recording_config: {
          max_seconds: 60,
          file_name_prefix: "string",
          video_config: {
            codec: "H264",
            width: 1280,
            height: 720,
            watermark: {
              url: "http://example.com",
              size: { width: 1, height: 1 },
              position: "left top",
            },
            export_file: true,
          },
          audio_config: {
            codec: "AAC",
            channel: "stereo",
            export_file: true,
          },
          storage_config: {
            type: "aws",
            access_key: "string",
            secret: "string",
            bucket: "string",
            region: "us-east-1",
            path: "string",
            auth_method: "KEY",
            username: "string",
            password: "string",
            host: "string",
            port: 0,
            private_key: "string",
          },
          dyte_bucket_config: {
            enabled: true,
          },
          live_streaming_config: {
            rtmp_url: "rtmp://a.rtmp.youtube.com/live2",
          },
        },
        ai_config: {
          transcription: {
            keywords: ["string"],
            language: "en-US",
            profanity_filter: false,
          },
          summarization: {
            word_limit: 500,
            text_format: "markdown",
            summary_type: "general",
          },
        },
        persist_chat: false,
        summarize_on_end: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Meeting created successfully:", data);
  } catch (error) {
    console.error("Failed to create meeting:", error);
  }
};
