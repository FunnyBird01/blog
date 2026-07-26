---
title: 音乐
date: 2026-07-23 00:00:00
type: 'music'
aplayer: true
---

## 我的音乐

欢迎来到我的音乐页面，这里收录了我喜欢的音乐。

### 音乐列表

| 歌曲名称 | 歌手 |
|---------|------|
| 生活没有同花顺 | 未知歌手 |

### 添加音乐

将你的 MP3 格式音频文件放入 `source/music/audio/` 目录下，然后在 `_config.butterfly.yml` 的 `aplayer.audio` 配置中添加新歌曲：

```yaml
aplayer:
  audio:
    - name: '歌曲名称'
      artist: '歌手名'
      url: '/music/audio/文件名.mp3'
      cover: '/images/封面图片.png'
```

### 播放器说明

全局音乐播放器位于页面底部，支持以下功能：
- ▶️ 播放 / ⏸️ 暂停
- 🔀 切换播放模式（列表循环、单曲循环、随机）
- 📋 展开/收起播放列表
- 🔊 音量调节

**支持格式：** MP3、WAV、OGG、FLAC、M4A
