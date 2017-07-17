// Copyright (c) 2017 Tracktunes Inc

export const WAV_MIME_TYPE: string = 'audio/wav';

export interface RecordingInfo {
    dateCreated: number;
    sampleRate: number;
    nSamples: number;
    encoding?: string;
    dbStartKey?: number;
    size?: number;
}

// this is just here for DRY-ness - things used in both player.ts
// and recorder.ts
export const AUDIO_CONTEXT: AudioContext =
    ((): AudioContext => {
        let context: AudioContext = null;
        window['AudioContext'] =
            window['AudioContext'] || window['webkitAudioContext'];
        try {
            context = new AudioContext();
        }
        catch (err) {
            alert('Web Audio API is not supported in this browser');
        }
        return context;
    })();
