---
title: "C盘清理"
---
# WinSxS 更新清理
1. 管理员身份打开命令提示符 / PowerShell
2. DISM /Online /Cleanup-Image /AnalyzeComponentStore  #扫描系统组件冗余
3. DISM /Online /Cleanup-Image /StartComponentCleanup  #清理系统组件冗余（30天外）
4. DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase #清理系统组件冗余（30天内）

# 临时文件
temp文件夹下都可以删除

# 旧驱动包
1. 管理员打开「磁盘清理」→ 选择 C 盘 → 点击清理系统文件
2. 勾选选项：设备驱动程序包
3. 确定删除，系统自动识别并移除长期未使用的旧驱动，保留当前设备在用驱动。

# Installer 孤儿 MSI
开源软件 PatchCleaner https://sourceforge.net/projects/patchcleaner/
下载安装后，打开自动扫描，可以先move到其他地方，观察几天不影响电脑后再删除
若出现软件异常，直接把文件移回C:\Windows\Installer即可恢复

# NativeImages/.NET assembly 失效缓存
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\ngen.exe update /force  （管理员 PowerShell 执行）