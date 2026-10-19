# KitsuPlay — Official Android App Website

<p align="center">
  <strong>Discover KitsuPlay. Download the APK. Explore every release.</strong>
  <br />
  বাংলা ও English — দুটো ভাষাতেই KitsuPlay-এর তথ্য ও ডাউনলোড গাইড।
</p>

<p align="center">
  <a href="https://github.com/senseiCodeHub/KitsuPlay-App/releases">Download APK</a> ·
  <a href="https://github.com/senseiCodeHub/KitsuPlay-App/releases">Release History</a> ·
  <a href="https://github.com/senseiCodeHub/KitsuPlay-App">Source Code</a>
</p>

**KitsuPlay-App** is the official website for the KitsuPlay Android app. It provides app information, direct APK downloads, release history, changelogs, and an installation guide. The site reads published release information from GitHub Releases, so maintainers can publish a new version without manually updating APK links in the website code.

---

## বাংলা

### KitsuPlay সম্পর্কে

KitsuPlay একটি Android streaming app, যেখানে MovieBox API ব্যবহার করে anime, movie ও TV content খোঁজা এবং দেখা যায়। অ্যাপের supported features-এর মধ্যে রয়েছে search, content details, episodes, video playback, watchlist, playback progress এবং downloads। কিছু account ও cloud-sync feature-এর জন্য Supabase configuration প্রয়োজন হতে পারে।

### ওয়েবসাইটের সুবিধা

- **সর্বশেষ APK:** GitHub Releases থেকে APK সরাসরি ডাউনলোড করুন।
- **রিলিজ হিস্ট্রি:** আগের version ও release notes দেখুন।
- **ইনস্টলেশন গাইড:** Android-এ APK ইনস্টল করার ধাপ জানুন।
- **Responsive UI:** মোবাইল, ট্যাবলেট ও ডেস্কটপে ব্যবহারযোগ্য।
- **স্বয়ংক্রিয় release listing:** GitHub Releases API থেকে release information লোড হয়।
- **সহজ maintenance:** APK Git history-তে না রেখে release asset হিসেবে প্রকাশ করা যায়।

### v1.0.3-এর উন্নয়ন

- Video player আরও উন্নত করা হয়েছে।
- MovieBox server-এর অভিজ্ঞতা উন্নত করা হয়েছে।
- Download system উন্নত করা হয়েছে।
- সর্বশেষ নির্বাচিত player server মনে রাখা হয়, যাতে পরেরবার ব্যবহার সহজ হয়।
- Performance ও stability improvements।

> সর্বশেষ version এবং পরিবর্তনের সম্পূর্ণ তালিকার জন্য [GitHub Releases](https://github.com/senseiCodeHub/KitsuPlay-App/releases) দেখুন।

### APK ডাউনলোড ও ইনস্টল

1. [Releases পেজে](https://github.com/senseiCodeHub/KitsuPlay-App/releases) যান।
2. পছন্দের release থেকে APK ফাইল ডাউনলোড করুন।
3. Android ডিভাইসে APK ফাইলটি খুলুন।
4. Android অনুমতি চাইলে সংশ্লিষ্ট browser বা file manager-এর জন্য “Install unknown apps” অনুমতি দিন।
5. ইনস্টলেশন শেষ হলে KitsuPlay খুলুন।

**নিরাপত্তা:** ইনস্টল করার আগে release version ও release notes যাচাই করুন। Android version ও device অনুযায়ী ধাপ আলাদা হতে পারে।

### ওয়েবসাইট কীভাবে release দেখায়?

ওয়েবসাইটটি এই repository-এর public GitHub Releases থেকে তথ্য সংগ্রহ করে। APK release asset হিসেবে প্রকাশ করুন; APK binary সরাসরি Git history-তে commit করবেন না। Draft release ও APK ছাড়া release ডাউনলোডযোগ্য APK হিসেবে দেখানো হয় না। Public release listing-এর জন্য আলাদা database বা Supabase connection দরকার নেই।

---

## English

### About KitsuPlay

KitsuPlay is an Android streaming app that uses the MovieBox API to discover and watch anime, movies, and TV content. Supported app features include search, content details, episodes, video playback, a watchlist, playback progress, and downloads. Some account and cloud-sync functionality may require Supabase configuration.

### Website features

- **Latest APK downloads:** Download APK files directly from GitHub Releases.
- **Release history:** Browse previous versions and changelogs.
- **Installation guide:** Follow the steps for installing the app on Android.
- **Responsive design:** Works across mobile, tablet, and desktop layouts.
- **Automatic release listing:** Release information is loaded from the GitHub Releases API.
- **Simple maintenance:** Publish APKs as release assets instead of committing binaries to Git history.

### What's improved in v1.0.3?

- Enhanced video player.
- Improved MovieBox server experience.
- Enhanced download system.
- Remembers the last selected player server for a smoother experience.
- Performance and stability improvements.

See [GitHub Releases](https://github.com/senseiCodeHub/KitsuPlay-App/releases) for the latest version and full changelog.

### Download and install

1. Visit the [Releases page](https://github.com/senseiCodeHub/KitsuPlay-App/releases).
2. Download the APK attached to your chosen release.
3. Open the downloaded APK on your Android device.
4. If prompted, allow your browser or file manager to install unknown apps.
5. Complete the installation and open KitsuPlay.

**Safety note:** Verify the release version and notes before installing. Steps may vary by Android version and device manufacturer.

### How release publishing works

The website reads public release data from this repository's GitHub Releases. Upload APK files as release assets rather than committing binaries to Git history. Draft releases and releases without APK assets are not presented as downloadable APKs. The public release listing does not require a separate database or Supabase connection.

---

## Technology stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Responsive CSS
- **Release data:** GitHub Releases API
- **Hosting:** Vercel

## Run locally

**Requirements:** Node.js 20.9 or newer (Node.js 22 LTS recommended).

```bash
git clone https://github.com/senseiCodeHub/KitsuPlay-App.git
cd KitsuPlay-App
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run a production build before deploying:

```bash
npm run build
```

## Publish a new APK release

1. Open the repository's [Releases page](https://github.com/senseiCodeHub/KitsuPlay-App/releases).
2. Select **Draft a new release** and create a version tag (for example, `v1.0.4`).
3. Upload the APK as a release asset (for example, `KitsuPlay-v1.0.4.apk`).
4. Add clear release notes and publish the release.
5. Verify the website displays the release and download link correctly.

Do not commit APK binaries to Git history.

## Deploy to Vercel

1. Import `senseiCodeHub/KitsuPlay-App` into Vercel.
2. Select the **Next.js** framework preset.
3. Keep the root directory set to `./`.
4. Deploy from the `main` branch.

Vercel will provide the deployment URL. No separate database is required for the public GitHub release listing.

## Project links

- **Repository:** https://github.com/senseiCodeHub/KitsuPlay-App
- **Downloads and release notes:** https://github.com/senseiCodeHub/KitsuPlay-App/releases
