const displayVideoEl = $("#displayVideo")[0];
const replayVideoEl = $("#replayVideo")[0];
const snapShotCvsEl = $("#snapshotCvs")[0];
const resultPre = $("#resultPre");

// 获取摄像头
const getUserMediaCb = () => {
    const constraints = {
        video: {
            frameRate: {min: 20}, // 帧率
            width: 480, // 宽
            height: 320, // 高
        },
        audio: false,
    };
    const getUserMediaSuccess = (stream) => {
        displayVideoEl.srcObject = stream;
    };
    window.navigator.mediaDevices.getUserMedia(constraints).then(getUserMediaSuccess);
};
$("#getUserMediaBtn").click(getUserMediaCb);

// 获取桌面
const getDisplayMediaCb = () => {
    const constraints = {
        video: {
            width: 480, // 宽
            height: 320, // 高
        },
    };
    const getDisplayMediaSuccess = (stream) => {
        displayVideoEl.srcObject = stream;
    };
    window.navigator.mediaDevices.getDisplayMedia(constraints).then(getDisplayMediaSuccess);
};
$("#getDisplayMediaBtn").click(getDisplayMediaCb);

// 获取媒体信息
const getMediaInfoCb = () => {
    const getMediaInfoSuccess = (mediaInfo) => {
        resultPre.text(JSON.stringify(mediaInfo, null, 2));
    };
    navigator.mediaDevices.enumerateDevices().then(getMediaInfoSuccess);
};
$("#getMediaInfoBtn").click(getMediaInfoCb);

// 截图
const snapshotCb = () => {
    const ctx = snapShotCvsEl.getContext("2d");
    ctx.drawImage(displayVideoEl, 0, 0, 300, 150);
};
$("#snapshotBtn").click(snapshotCb);

// 录制
let mediaRecorder = null;
const buffer = [];
const recordCb = () => {
    const stream = displayVideoEl.srcObject;
    mediaRecorder = new MediaRecorder(stream, {mimeType: "video/webm;codecs=vp8"});
    mediaRecorder.ondataavailable = (e) => {
        e?.data?.size && buffer.push(e?.data);
    };
    mediaRecorder.start(200);
};
$("#recordBtn").click(recordCb);

const stopRecordCb = () => {
    mediaRecorder?.stop();
    mediaRecorder = null;
};
$("#stopRecordBtn").click(stopRecordCb);

// 播放录制
const replayCb = () => {
    const blob = new Blob(buffer, {type: "video/webm"});
    replayVideoEl.src = window.URL.createObjectURL(blob);
    replayVideoEl.srcObject = null;
    replayVideoEl.play();
}
$("#replayBtn").click(replayCb);

// 下载视频
$("#downloadBtn");
