import type { Language } from "@/contexts/LanguageContext";

/*
 * Blog articles. Each one is written in both languages; the Indonesian version
 * is what gets prerendered and indexed. Keep them useful on their own: the link
 * to a Livales product comes at the end (`product`), not in every paragraph.
 * Adding a post: append it here; the route, sitemap, and JSON-LD follow.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface PostCopy {
  title: string;
  /** One or two sentences: the meta description and the lead paragraph. */
  description: string;
  body: Block[];
}

export interface Post {
  slug: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  /** The Livales product the article leads to, if any. */
  product?: "kado" | "kana" | "hl";
  copy: Record<Language, PostCopy>;
}

export const posts: Post[] = [
  {
    slug: "pertanyaan-untuk-pasangan",
    date: "2026-11-02",
    readMinutes: 6,
    product: "hl",
    copy: {
      id: {
        title: "30 pertanyaan untuk pasangan, dari yang ringan sampai yang dalam",
        description:
          "Daftar pertanyaan untuk pasangan yang bisa kalian pakai saat makan malam, di perjalanan, atau lewat video call. Dibagi tiga tingkat supaya obrolannya mengalir pelan-pelan.",
        body: [
          {
            type: "p",
            text: "Setelah lama bersama, obrolan sehari-hari sering berputar di hal yang sama: kerjaan, makan apa, siapa yang jemput. Bukan karena tidak ada lagi yang ingin diceritakan, tapi karena jarang ada pemicu untuk memulainya.",
          },
          {
            type: "p",
            text: "Pertanyaan yang tepat bisa jadi pemicu itu. Daftar di bawah kami bagi tiga: mulai dari yang ringan untuk pemanasan, lalu tentang kalian berdua, lalu yang lebih dalam. Tidak perlu dijawab semuanya dalam satu malam.",
          },
          { type: "h2", text: "Cara memakainya" },
          {
            type: "ul",
            items: [
              "Pilih waktu yang santai, misalnya makan malam tanpa HP di meja atau perjalanan jauh.",
              "Bergantian: satu bertanya, dua-duanya menjawab.",
              "Dengarkan sampai selesai sebelum menanggapi. Pertanyaan lanjutan seperti \"terus, rasanya gimana?\" sering lebih berharga dari pertanyaan berikutnya.",
              "Boleh melewati pertanyaan yang belum ingin dijawab.",
            ],
          },
          { type: "h2", text: "Ringan, untuk pemanasan" },
          {
            type: "ol",
            items: [
              "Makanan apa yang selalu bikin kamu senang, walaupun harimu buruk?",
              "Kalau besok libur tanpa rencana, kamu mau ngapain dari pagi sampai malam?",
              "Lagu apa yang langsung mengingatkanmu pada masa SMA?",
              "Kebiasaan kecil apa dariku yang diam-diam kamu suka?",
              "Tempat mana yang ingin kamu datangi berdua tahun depan?",
              "Film atau serial apa yang ingin kamu tonton ulang bersamaku?",
              "Hal paling lucu apa yang pernah terjadi waktu kita jalan bareng?",
              "Kalau bisa punya satu keahlian baru dalam semalam, kamu pilih apa?",
              "Apa hadiah kecil yang paling berkesan yang pernah kamu terima?",
              "Hari Minggu yang sempurna menurutmu seperti apa?",
            ],
          },
          { type: "h2", text: "Tentang kita berdua" },
          {
            type: "ol",
            items: [
              "Apa yang pertama kali kamu perhatikan dariku?",
              "Kapan kamu merasa paling dekat denganku belakangan ini?",
              "Kenangan kita yang mana yang ingin kamu ulang?",
              "Apa hal kecil yang aku lakukan yang selalu membuat harimu lebih baik?",
              "Di bagian mana kita paling mirip, dan di bagian mana paling beda?",
              "Kebiasaan apa yang ingin kamu mulai bersama?",
              "Kapan terakhir kali kamu merasa bangga padaku?",
              "Apa yang bikin kamu merasa diperhatikan, bukan sekadar ditanya kabar?",
              "Kalau hubungan kita jadi film, judulnya apa?",
              "Apa yang ingin kamu lebih sering dengar dariku?",
            ],
          },
          { type: "h2", text: "Lebih dalam" },
          {
            type: "ol",
            items: [
              "Apa yang paling kamu takutkan tentang masa depan, dan bagaimana aku bisa membantu?",
              "Nilai apa dari keluargamu yang ingin kamu bawa ke hubungan kita?",
              "Kapan kamu merasa paling tidak dimengerti, dan apa yang sebenarnya kamu butuhkan saat itu?",
              "Bagaimana gambaran hubungan kita lima tahun dari sekarang?",
              "Ada hal yang dulu sulit kamu ceritakan tapi sekarang ingin kamu bagi?",
              "Kalau kita sedang bertengkar, apa yang paling membantumu untuk tenang?",
              "Apa arti rumah buatmu?",
              "Mimpi apa yang belum pernah kamu ucapkan ke siapa pun?",
              "Apa yang ingin kamu syukuri dari hubungan kita tahun ini?",
              "Ada janji kecil yang ingin kita buat bersama mulai minggu ini?",
            ],
          },
          { type: "h2", text: "Setelah ngobrol" },
          {
            type: "p",
            text: "Tulis satu atau dua jawaban yang paling berkesan. Beberapa bulan lagi, membacanya ulang bisa jadi kejutan manis. Jawaban berubah seiring waktu, dan perubahan itu sendiri bagian dari cerita kalian.",
          },
          {
            type: "p",
            text: "Kalau ingin cara yang lebih seru, kami sedang membuat Hearts & Ladders: ular tangga untuk pasangan, di mana kotak hati membuka pertanyaan dan tantangan seperti ini, dan jawabannya tersimpan jadi kenangan.",
          },
        ],
      },
      en: {
        title: "30 questions for couples, from light to deep",
        description:
          "Questions for couples to use over dinner, on a long drive, or on a video call. Split into three levels so the conversation can open up gradually.",
        body: [
          {
            type: "p",
            text: "After a while together, everyday conversation tends to circle the same things: work, what to eat, who's picking whom up. Not because there's nothing left to say, but because there's rarely a reason to start.",
          },
          {
            type: "p",
            text: "The right question can be that reason. The list below has three parts: light ones to warm up, then questions about the two of you, then deeper ones. There's no need to get through them all in one night.",
          },
          { type: "h2", text: "How to use them" },
          {
            type: "ul",
            items: [
              "Pick a relaxed moment, like dinner with phones off the table or a long trip.",
              "Take turns: one person asks, you both answer.",
              "Listen all the way through before responding. A follow-up like \"and how did that feel?\" is often worth more than the next question.",
              "It's fine to skip a question you're not ready to answer.",
            ],
          },
          { type: "h2", text: "Light, to warm up" },
          {
            type: "ol",
            items: [
              "What food always cheers you up, even on a bad day?",
              "If tomorrow were a day off with no plans, what would you do from morning to night?",
              "Which song takes you straight back to high school?",
              "What small habit of mine do you secretly like?",
              "Where would you like us to go together next year?",
              "Which film or series would you like to rewatch with me?",
              "What's the funniest thing that's happened on one of our outings?",
              "If you could pick up one new skill overnight, what would it be?",
              "What's the most memorable small gift you've ever received?",
              "What does a perfect Sunday look like to you?",
            ],
          },
          { type: "h2", text: "About the two of us" },
          {
            type: "ol",
            items: [
              "What was the first thing you noticed about me?",
              "When did you feel closest to me recently?",
              "Which of our memories would you like to relive?",
              "What small thing do I do that always makes your day better?",
              "Where are we most alike, and where are we most different?",
              "What habit would you like us to start together?",
              "When did you last feel proud of me?",
              "What makes you feel cared for, beyond being asked how your day was?",
              "If our relationship were a film, what would it be called?",
              "What would you like to hear from me more often?",
            ],
          },
          { type: "h2", text: "Going deeper" },
          {
            type: "ol",
            items: [
              "What worries you most about the future, and how can I help?",
              "Which value from your family would you like to bring into our relationship?",
              "When do you feel least understood, and what do you actually need in that moment?",
              "How do you picture our relationship five years from now?",
              "Is there something that used to be hard to tell me that you'd like to share now?",
              "When we argue, what helps you calm down the most?",
              "What does home mean to you?",
              "What's a dream you've never said out loud to anyone?",
              "What are you grateful for in our relationship this year?",
              "Is there a small promise we could make to each other, starting this week?",
            ],
          },
          { type: "h2", text: "After you talk" },
          {
            type: "p",
            text: "Write down one or two answers that stayed with you. A few months from now, reading them again can be a sweet surprise. Answers change over time, and that change is part of your story too.",
          },
          {
            type: "p",
            text: "If you'd like a more playful way to do this, we're making Hearts & Ladders: snakes and ladders for couples, where heart squares open questions and dares like these, and your answers are saved as memories.",
          },
        ],
      },
    },
  },
  {
    slug: "cara-memilih-kado",
    date: "2026-11-02",
    readMinutes: 5,
    product: "kado",
    copy: {
      id: {
        title: "Cara memilih kado yang beneran disukai, bukan sekadar ide",
        description:
          "Lima langkah memilih kado untuk pasangan, keluarga, atau teman: mulai dari memperhatikan cerita sehari-hari sampai menulis pesan yang membuat kadonya terasa personal.",
        body: [
          {
            type: "p",
            text: "Mencari kado sering dimulai dengan mengetik \"ide kado untuk pacar\" di mesin pencari, lalu tenggelam di daftar yang sama dengan semua orang. Hasilnya kado yang aman, tapi jarang yang benar-benar dipakai.",
          },
          {
            type: "p",
            text: "Kado yang disukai biasanya bukan yang paling mahal, tapi yang paling pas. Langkah-langkah di bawah membantu kamu sampai ke sana.",
          },
          { type: "h2", text: "Lima langkah" },
          {
            type: "ol",
            items: [
              "Dengarkan keluhan kecilnya. \"Botol minumku bocor terus\" atau \"headset-ku sudah rusak sebelah\" adalah petunjuk kado yang paling jujur. Catat di HP setiap kali kamu mendengarnya.",
              "Lihat apa yang dia pakai setiap hari. Kado yang menggantikan barang lama dengan versi yang lebih baik hampir selalu terpakai.",
              "Cek wishlist-nya, atau tanya orang terdekatnya. Bertanya ke sahabat atau saudaranya bukan curang. Itu tanda kamu serius.",
              "Tentukan budget, lalu pertimbangkan patungan. Untuk kado yang lebih besar, patungan dengan teman membuat kamu bisa memberi yang benar-benar dia butuhkan.",
              "Tulis pesan yang spesifik. \"Selamat ulang tahun\" mudah dilupakan. \"Biar kamu nggak kehujanan lagi waktu nunggu ojek\" akan diingat.",
            ],
          },
          { type: "h2", text: "Barang atau pengalaman?" },
          {
            type: "p",
            text: "Untuk orang yang sudah punya segalanya, pengalaman sering lebih berkesan: kelas memasak berdua, tiket konser, atau sehari penuh mengikuti rencanamu. Untuk orang yang praktis, barang yang dipakai setiap hari terasa lebih perhatian. Tidak ada jawaban yang selalu benar. Kembali ke langkah pertama: apa yang dia ceritakan?",
          },
          { type: "h2", text: "Kesalahan yang sering terjadi" },
          {
            type: "ul",
            items: [
              "Memilih kado yang sebenarnya kamu sendiri inginkan.",
              "Membeli di menit terakhir, sehingga pilihan tinggal yang ada di toko terdekat.",
              "Lupa ukuran, warna, atau tipe HP-nya. Cek dulu diam-diam.",
              "Menganggap harga sebagai ukuran perhatian.",
            ],
          },
          { type: "h2", text: "Mulai dari yang kecil" },
          {
            type: "p",
            text: "Kado tidak harus menunggu ulang tahun. Barang kecil yang menjawab keluhannya minggu lalu sering terasa lebih hangat daripada kado besar setahun sekali.",
          },
          {
            type: "p",
            text: "Kalau masih bingung, Kado Livales bisa membantu: jawab empat pertanyaan singkat, lalu lihat produk nyata dari marketplace Indonesia yang kami pilih satu per satu. Ada juga wishlist dan patungan kado bareng teman.",
          },
        ],
      },
      en: {
        title: "How to choose a gift they'll actually like, not just an idea",
        description:
          "Five steps to choosing a gift for a partner, family member, or friend: from paying attention to everyday stories to writing a message that makes it personal.",
        body: [
          {
            type: "p",
            text: "Gift hunting often starts with searching \"gift ideas for my partner\" and getting lost in the same lists everyone else reads. The result is a safe gift, but rarely one that gets used.",
          },
          {
            type: "p",
            text: "The gifts people love usually aren't the most expensive ones, just the best fit. The steps below help you get there.",
          },
          { type: "h2", text: "Five steps" },
          {
            type: "ol",
            items: [
              "Listen for small complaints. \"My water bottle keeps leaking\" or \"one side of my headphones is dead\" are the most honest gift hints there are. Note them on your phone whenever you hear one.",
              "Look at what they use every day. A gift that replaces something old with a better version almost always gets used.",
              "Check their wishlist, or ask the people closest to them. Asking a best friend or sibling isn't cheating. It shows you care.",
              "Set a budget, then consider chipping in. For a bigger gift, pooling money with friends lets you give what they actually need.",
              "Write a specific message. \"Happy birthday\" is easy to forget. \"So you never get soaked waiting for a ride again\" sticks.",
            ],
          },
          { type: "h2", text: "Things or experiences?" },
          {
            type: "p",
            text: "For someone who has everything, an experience is often more memorable: a cooking class together, concert tickets, or a whole day planned around them. For a practical person, something they use every day feels more thoughtful. There's no answer that's always right. Go back to step one: what have they been telling you?",
          },
          { type: "h2", text: "Common mistakes" },
          {
            type: "ul",
            items: [
              "Choosing a gift you secretly want for yourself.",
              "Buying at the last minute, when all that's left is the nearest shop.",
              "Forgetting their size, colour, or phone model. Check quietly first.",
              "Treating price as a measure of care.",
            ],
          },
          { type: "h2", text: "Start small" },
          {
            type: "p",
            text: "Gifts don't have to wait for birthdays. A small thing that answers last week's complaint often feels warmer than one big present a year.",
          },
          {
            type: "p",
            text: "If you're still stuck, Kado Livales can help: answer four short questions, then browse real products from Indonesian marketplaces that we pick one by one. There are wishlists and group gifts too.",
          },
        ],
      },
    },
  },
  {
    slug: "tetap-dekat-saat-ldr",
    date: "2026-11-02",
    readMinutes: 5,
    product: "hl",
    copy: {
      id: {
        title: "Tetap dekat saat LDR: 7 kebiasaan kecil yang bisa dicoba",
        description:
          "Hubungan jarak jauh tidak harus terasa jauh. Tujuh kebiasaan sederhana untuk pasangan LDR, dari ritual pagi sampai kencan virtual yang tidak membosankan.",
        body: [
          {
            type: "p",
            text: "Jarak membuat hal-hal kecil hilang lebih dulu: sapaan sambil lalu, makan bareng tanpa rencana, cerita singkat di perjalanan pulang. Yang tersisa sering hanya video call panjang yang terasa seperti kewajiban.",
          },
          {
            type: "p",
            text: "Kabar baiknya, kedekatan lebih banyak dibangun dari kebiasaan kecil yang rutin daripada momen besar yang jarang. Berikut tujuh yang bisa kalian coba mulai minggu ini.",
          },
          { type: "h2", text: "Tujuh kebiasaan" },
          {
            type: "ul",
            items: [
              "Ritual pagi dan malam. Satu pesan suara singkat saat bangun dan sebelum tidur. Mendengar suara terasa jauh lebih dekat daripada membaca teks.",
              "Kirim hal-hal biasa. Foto makan siang, jalan yang macet, kucing tetangga. Hubungan jarak jauh sering terlalu fokus pada kabar penting, padahal yang dirindukan justru hal biasa.",
              "Kencan dengan aktivitas, bukan hanya ngobrol. Masak menu yang sama, nonton film yang sama sambil telepon, atau main game berdua. Mengerjakan sesuatu bersama mengurangi tekanan untuk terus punya bahan obrolan.",
              "Jadwal yang jelas, tapi tidak kaku. Sepakati kapan biasanya bisa telepon, dan jujur kalau hari itu sedang capek. Lebih baik telepon sepuluh menit yang hangat daripada satu jam yang dipaksakan.",
              "Hitung mundur ke pertemuan berikutnya. Punya tanggal yang ditunggu membuat jarak terasa sementara.",
              "Kejutan kecil lewat kurir. Camilan favoritnya, surat tulisan tangan, atau barang yang dia sebut minggu lalu.",
              "Pertanyaan yang lebih dalam, sesekali. Seminggu sekali, ganti \"lagi ngapain?\" dengan satu pertanyaan yang membuat kalian bercerita lebih panjang.",
            ],
          },
          { type: "h2", text: "Saat salah paham" },
          {
            type: "p",
            text: "Tanpa nada suara dan ekspresi wajah, pesan singkat mudah disalahartikan. Kalau mulai terasa panas, pindah ke telepon. Dan kalau sudah larut malam, sepakati untuk melanjutkan besok. Masalah yang dibahas dalam keadaan lelah jarang selesai.",
          },
          { type: "h2", text: "Jarak sebagai bagian cerita" },
          {
            type: "p",
            text: "Banyak pasangan yang pernah LDR justru mengenang masa itu sebagai waktu mereka belajar berkomunikasi. Kebiasaan yang kalian bangun sekarang akan tetap berguna saat sudah tinggal di kota yang sama.",
          },
          {
            type: "p",
            text: "Untuk kencan virtual yang berbeda, coba Hearts & Ladders yang sedang kami uji di Android. Dua HP bisa tersambung lewat kode undangan, jadi kalian bisa main ular tangga dan menjawab tantangan bersama dari kota yang berbeda.",
          },
        ],
      },
      en: {
        title: "Staying close in a long-distance relationship: 7 small habits to try",
        description:
          "Long distance doesn't have to feel distant. Seven simple habits for long-distance couples, from morning rituals to virtual dates that don't get dull.",
        body: [
          {
            type: "p",
            text: "Distance takes away the small things first: passing hellos, unplanned meals together, quick stories on the way home. What's left is often a long video call that starts to feel like a duty.",
          },
          {
            type: "p",
            text: "The good news is that closeness is built more by small, regular habits than by big, rare moments. Here are seven you can try starting this week.",
          },
          { type: "h2", text: "Seven habits" },
          {
            type: "ul",
            items: [
              "A morning and night ritual. One short voice note when you wake up and before you sleep. Hearing a voice feels much closer than reading text.",
              "Send ordinary things. A photo of lunch, a traffic jam, the neighbour's cat. Long-distance couples often focus on big news, but it's the ordinary that you miss.",
              "Date with an activity, not just talking. Cook the same dish, watch the same film on a call, or play a game together. Doing something side by side takes away the pressure to keep finding things to say.",
              "A clear schedule, but not a rigid one. Agree on when you usually call, and be honest when you're tired. Ten warm minutes beat a forced hour.",
              "Count down to the next visit. Having a date to look forward to makes the distance feel temporary.",
              "Small surprises by courier. Their favourite snack, a handwritten letter, or the thing they mentioned last week.",
              "A deeper question, now and then. Once a week, swap \"what are you up to?\" for one question that gets you both talking for longer.",
            ],
          },
          { type: "h2", text: "When things get misread" },
          {
            type: "p",
            text: "Without tone of voice or facial expressions, short messages are easy to misread. If things start heating up, switch to a call. And if it's late, agree to pick it up tomorrow. Problems discussed while exhausted rarely get solved.",
          },
          { type: "h2", text: "Distance as part of the story" },
          {
            type: "p",
            text: "Many couples who've been long-distance remember it as the time they learned to communicate. The habits you build now will still help once you're in the same city.",
          },
          {
            type: "p",
            text: "For a different kind of virtual date, try Hearts & Ladders, which we're testing on Android. Two phones can connect with an invite code, so you can play snakes and ladders and take on challenges together from different cities.",
          },
        ],
      },
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string, language: Language) =>
  new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
