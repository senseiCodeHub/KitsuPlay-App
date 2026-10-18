# KitsuPlay — Official Android App Website

**বাংলা | [English](#english)**

KitsuPlay-এর অফিসিয়াল ওয়েবসাইটে স্বাগতম! এই ওয়েবসাইটের মাধ্যমে আপনি KitsuPlay Android অ্যাপ সম্পর্কে জানতে পারবেন, সর্বশেষ APK ডাউনলোড করতে পারবেন এবং আগের ভার্সনগুলোর তথ্য ও রিলিজ নোট দেখতে পারবেন।

## বাংলা

### 🌟 এই ওয়েবসাইটে কী পাবেন?

- **সর্বশেষ APK ডাউনলোড:** উপলভ্য সর্বশেষ stable release থেকে KitsuPlay-এর Android APK ডাউনলোড করুন।
- **ভার্সন হিস্ট্রি:** আগের রিলিজগুলো ও সেগুলোর ভার্সন নম্বর দেখুন।
- **রিলিজ নোট:** নতুন ভার্সনে কী পরিবর্তন হয়েছে, তা পড়ুন।
- **ইনস্টলেশন নির্দেশনা:** Android ডিভাইসে অ্যাপ ইনস্টল করার নির্দেশনা অনুসরণ করুন।
- **মোবাইল-ফ্রেন্ডলি ডিজাইন:** ফোন, ট্যাবলেট ও ডেস্কটপে ওয়েবসাইট ব্যবহার করুন।

### 📥 APK কীভাবে ডাউনলোড করবেন?

1. KitsuPlay ওয়েবসাইটের Download বা Releases অংশে যান।
2. সর্বশেষ stable version-এর ডাউনলোড অপশন নির্বাচন করুন।
3. APK ডাউনলোড শেষ হলে Android ডিভাইসে ফাইলটি খুলুন।
4. প্রয়োজন হলে Android-এর সেটিংস থেকে আপনার ব্রাউজার বা ফাইল ম্যানেজারের জন্য এই উৎস থেকে অ্যাপ ইনস্টল করার অনুমতি দিন।
5. ইনস্টলেশন সম্পন্ন হলে অ্যাপটি খুলুন।

**নিরাপত্তা:** APK ইনস্টল করার আগে রিলিজের তথ্য যাচাই করুন এবং কেবল আপনার বিশ্বাসযোগ্য উৎস থেকে অ্যাপ ইনস্টল করুন। Android-এর সংস্করণ ও ডিভাইসের সেটিংস অনুযায়ী ইনস্টলেশনের ধাপ কিছুটা আলাদা হতে পারে।

### 🔄 নতুন ভার্সন কীভাবে প্রকাশ করা হয়?

ওয়েবসাইটটি এই GitHub repository-এর public Releases থেকে রিলিজের তথ্য পড়ে। সর্বশেষ প্রকাশিত stable release-এ APK থাকলে সেটি ডাউনলোডের জন্য দেখানো হয়। APK-সহ prerelease-গুলো version history-তে আলাদাভাবে দেখানো হতে পারে। Draft release ও APK ছাড়া release ডাউনলোডযোগ্য APK হিসেবে দেখানো হয় না।

### ℹ️ ওয়েবসাইট সম্পর্কে

- এটি KitsuPlay Android অ্যাপের ডাউনলোড ও রিলিজ-তথ্য দেখানোর ওয়েবসাইট।
- APK ফাইল GitHub Releases থেকে সরাসরি ডাউনলোড হয়।
- ওয়েবসাইটে APK আপলোড করার জন্য Git history-তে binary file রাখা হয় না।
- এই ওয়েবসাইটের জন্য আলাদা database বা Supabase সংযোগ প্রয়োজন নেই।

---

## English

Welcome to the KitsuPlay website! Use this site to learn about the KitsuPlay Android app, download the latest available APK, and explore previous versions and release notes.

### 🌟 What can you find here?

- **Latest APK download:** Download the APK attached to the latest available stable release.
- **Version history:** Browse previous releases and their version numbers.
- **Release notes:** Read about changes and improvements in each release.
- **Installation guide:** Follow the instructions to install the app on an Android device.
- **Responsive design:** Use the website on phones, tablets, and desktop computers.

### 📥 How to download and install the APK

1. Open the Download or Releases section of the KitsuPlay website.
2. Choose the download option for the latest stable version.
3. Once the APK has downloaded, open the file on your Android device.
4. If prompted, allow your browser or file manager to install apps from that source in Android settings.
5. Finish installation and open the app.

**Safety note:** Review the release information before installing an APK and install apps only from sources you trust. Exact installation steps may vary by Android version and device settings.

### 🔄 How releases appear on the website

The website reads release information from this repository's public GitHub Releases. When the latest published stable release includes an APK, the site presents it for download. Prereleases that include APK files may appear separately in the version history. Draft releases and releases without an APK are not presented as downloadable APKs.

### ℹ️ About this website

- This is the download and release-information website for the KitsuPlay Android app.
- APK files are downloaded directly from GitHub Releases.
- APK binaries should be uploaded as GitHub Release assets rather than committed to Git history.
- The website does not require a separate database, Supabase connection, or GitHub token for its public release listing.

---

## Technology stack

- Next.js App Router
- TypeScript
- Responsive CSS
- GitHub public Releases API
- Vercel deployment

## Run locally (for contributors)

Requirements: Node.js 20.9 or newer (Node.js 22 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Check the production build before deploying:

```bash
npm run build
```

## Publish a new APK release (maintainers)

1. Open the repository's **Releases** page and select **Draft a new release**.
2. Create a version tag, for example `v1.0.0`.
3. Upload the APK as a release asset, for example `KitsuPlay-v1.0.0.apk`.
4. Add clear release notes and publish the release.

Do not commit APK binaries to Git history. Publish them as GitHub Release assets.

## Deploy to Vercel

Import `senseiCodeHub/KitsuPlay-App` into Vercel, use the Next.js framework preset, keep the root directory as `./`, and deploy from `main`. Vercel will provide the deployment URL.

## Project links

- **GitHub repository:** https://github.com/senseiCodeHub/KitsuPlay-App
- **GitHub releases:** https://github.com/senseiCodeHub/KitsuPlay-App/releases
