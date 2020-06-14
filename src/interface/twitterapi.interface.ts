export interface ITweetPhotoSize{
    w: number;
    h: number;
    resize: 'crop' | 'fit';
}

/**
 * @interface ITweetEntityHashTag 推文中的#标签
 * @prop {number[]} indices 一个整数数组，指示#标签的开始和结束的 Tweet 文本中的偏移量。第一个整数表示推文text中#字符的位置。第二个整数表示标签后第一个非#标签字符的位置。也就是说二者之差就是该#标签的长度
 * @prop {string} text #标签不含#的部分
 */
export interface ITweetEntityHashTag{
    indices: Array<number>;
    text: string;
}

/**
 * @interface ITweetEntityMedia 推文中附加的媒体
 * @prop {string} display_url 要显示给客户端的媒体 URL。
 * @prop {string} expanded_url display_url的扩展版本。指向媒体显示页的链接。
 * @prop {number} id 媒体id，64位整数
 * @prop {number} id_str 媒体id的字符串版本
 * @prop {number[]} indices 一个整数数组，指示URL的开始和结束在 Tweet 文本中的偏移量。
 * @prop {string} media_url 直接指向上载的媒体文件的URL。无法直接访问，必须使用OAuth1.0A的认证才能GET
 * @prop {string} media_url_https 直接指向上载的媒体文件的URL的https链接。无法直接访问，必须使用OAuth1.0A的认证才能GET
 * 
 * 加载照片的现代格式于 2015 年在 Twitter 上建立，自 2017 年以来一直到现在。所有照片媒体加载应迁移到此格式。
 * 
 * <base_url>?format=<format>&name=<name>
 * 
 * 例如： https://pbs.twimg.com/media/DOhM30VVwAEpIHq?format=jpg&name=large
 * @prop {Object} sizes 显示媒体文件的可用尺寸的对象。
 * @prop {number} source_status_id 可为空，对于包含最初与不同推文关联的媒体的推文，此 ID 指向原始推文。
 * @prop {string} source_status_id_str 可为空，source_status_id的字符串版本
 * @prop {string} type 上载的媒体的类型。可能的类型包括photo、video和animated_gif。
 * @prop {string} url 媒体链接的包装 URL。这与直接嵌入到原始推文文本中的 URL 以及参数的值相对应。
 */
interface ITweetEntityMediaBase{
    display_url: string;
    expanded_url: string;
    id: number;
    id_str: string;
    indices: Array<number>;
    media_url: string;
    media_url_https: string;
    sizes: {
        [T in 'thumb' | 'medium' | 'small' | 'large']: ITweetPhotoSize
    };
    source_status_id?: number;
    source_status_id_str?: string;
    source_user_id?: number;
    source_user_id_str?: string;
    type: string;
    url: string;
}

export interface ITweetEntityMediaVideo extends ITweetEntityMediaBase{
    type: 'video';
    video_info: ITweetEntityMediaVideoInfo;
}

export interface ITweetEntityMediaGif extends ITweetEntityMediaBase{
    type: 'animated_gif';
    video_info: ITweetEntityMediaVideoInfo;
}

export interface ITweetEntityMediaPhoto extends ITweetEntityMediaBase{
    type: 'photo'
}

export type ITweetEntityMedia = ITweetEntityMediaVideo | ITweetEntityMediaGif | ITweetEntityMediaPhoto;

interface ITweetEntityMediaVideoInfo{
    aspect_ratio: Array<number>;
    duration_millis: number;
    variants: Array<ITweetEntityMediaVariant>
}

interface ITweetEntityMediaVariant{
    bitrate: number;
    content_type: 'video/mp4' | 'application/x-mpegURL';
    url: string;
}

/**
 * @interface ITweetEntityUrl 推文中附加的链接
 * @prop {string} display_url 粘贴/键入推文的 URL（实际显示的url）。
 * @prop {string} expanded_url "display_url"的扩展版本(完整url)。
 * @prop {number[]} indices 一个整数数组，指示URL的开始和结束在 Tweet 文本中的偏移量。
 * @prop {string} url 包装 URL，对应于直接嵌入到原始推文文本中的值，以及索引参数的值。
 */
 export interface ITweetEntityUrl{
    display_utl: string;
    expanded_url: string;
    indices: Array<number>;
    url: string;
 }

 /**
 * @interface ITweetEntityUser 推文中被提及的用户
 * @prop {number} id 所述用户的整数型 ID。
 * @prop {number} id_str 用户ID的字符串形式
 * @prop {number[]} indices 一个整数数组，指示用户提及的开始和结束在 Tweet 文本中的偏移量。第一个整数表示推文text中@字符的位置。第二个整数表示标签后第一个非screen_name字符的位置。
 * @prop {string} name 用户名
 * @prop {string} screen_name 用户识别名
 */
 export interface ITweetEntityUser{
    id: number;
    id_str: string;
    indices: Array<number>;
    name: string;
    screen_name: string;
}

/**
 * @interface ITweetEntityHashTag 推文中的$标签
 * @prop {number[]} indices 一个整数数组，指示$标签的开始和结束的 Tweet 文本中的偏移量。第一个整数表示推文text中$字符的位置。第二个整数表示标签后第一个非$标签字符的位置。也就是说二者之差就是该$标签的长度
 * @prop {string} text $标签不含$的部分
 */
export interface ITweetEntitySymbol{
    indices: Array<number>;
    text: string;
}

export interface ITweetEnities{
    hashtags: Array<ITweetEntityHashTag>;
    symbols: Array<ITweetEntitySymbol>;
    user_mentions: Array<ITweetEntityUser>;
    urls: Array<ITweetEntityUrl>;
    media?: Array<ITweetEntityMedia>;
}

export interface ITweetExtendedEntities{
    media: Array<ITweetEntityMedia>;
}

/**
 * @interface ITweetUser api响应中的用户接口
 * @prop {number} id 此用户的唯一标识符的整数表示形式。这个数字大于 53 位。
 * @prop {string} id_str 此用户的唯一标识符的字符串表示形式。
 * @prop {string} name 用户的名称，不一定是一个人的名字。通常上限为 50 个字符，但可能会更改。
 * @prop {string} screen_name 此用户标识自己的屏幕名称、句柄或别名。screen_names是独一无二的，但可能会发生变化。通常最多 15 个字符长，但某些历史帐户可能存在较长的名称。
 * @prop {string} location 此帐户配置文件的用户定义位置。不一定是一个位置，也不一定是机器可分析的。搜索服务偶尔会模糊地解释此字段。
 * @prop {string} url 用户提供的 URL，与其配置文件关联。
 * @prop {string} description 用户的描述
 * @prop {boolean} protected 如果为 true，则表示此用户已选择保护其推文。
 * @prop {boolean} verified 如果为 true，则指示用户具有已认证的帐户。
 * @prop {number} followers_count 此帐户当前具有的关注者数。在某些条件下，此字段将暂时指示"0"
 * @prop {number} friends_count 此帐户关注数。在某些条件下，此字段将暂时指示"0"
 * @prop {number} listed_count 此用户是 其成员的公共列表数。
 * @prop {number} favourites_count 此用户在帐户的生存期内喜欢的推文数。
 * @prop {number} statuses_count 用户发出的推文（包括转推）数。
 * @prop {string} created_at 用户帐户在 Twitter 上创建的 UTC 日期时间。
 * @prop {string} profile_banner_url 基于 HTTPS 的 URL 指向用户上传的配置文件横幅的标准 Web 表示形式。通过添加 URL 的最终路径元素，可以获取针对特定显示器优化的不同图像大小，参见: https://developer.twitter.com/en/docs/accounts-and-users/user-profile-images-and-banners
 * @prop {string} profile_image_url_https 指向用户的profile图像的基于 HTTPS 的 URL。
 * @prop {boolean} default_profile 如果为 true，则表示用户未更改其用户配置文件的主题或背景。
 * @prop {boolean} default_profile_image 如果为 true，则表示用户尚未上载自己的配置文件映像，而是使用默认图像。
 */
export interface ITweetUser{
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    url: string;
    description: string;
    protected: boolean;
    verified: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    statuses_count: number;
    favourites_count: number;
    created_at: string;
    profile_banner_url: string;
    profile_image_url_https: string;
    default_profile: boolean;
    default_profile_image: boolean;
    withheld_in_countries?: Array<string>;
    withheld_scope?: string;
    derived?: Array<any>;
}
/**
 * @interface ITweet Tweet对象
 * @prop {string} created_at 创建此推文的 UTC 时间
 * @prop {number} id 此推文的唯一标识符的整数表示形式。这个数字大于 53 位。
 * @prop {string} id_str 此推文的唯一标识符的字符串表示形式。
 * @prop {boolean} truncated 指示参数的值是否被截断，例如，由于转推超过原始推文文本长度限制 140 个字符的结果。
 * @prop {number} in_reply_to_status_id 如果表示的推文是回复，则此字段将包含原始推文 ID 的整数表示形式，否则为空。
 * @prop {string} in_reply_to_status_id_str 如果表示的推文是回复，则此字段将包含原始推文 ID 的字符串表示形式，否则为空。
 * @prop {number} in_reply_to_user_id 如果表示的推文是回复，则此字段将包含原始推文的作者 ID 的整数表示形式，否则为空。
 * @prop {string} in_reply_to_user_id_str 如果表示的推文是回复，则此字段将包含原始推文的作者 ID 的字符串表示形式，否则为空。
 * @prop {string} in_reply_to_screen_name 如果表示的推文是回复，则此字段将包含原始推文作者的屏幕名称，否则为空。
 * @prop {ITweetUser} user 发布此推文的用户。
 * @prop {any} coordinates 表示用户或客户端应用程序报告的此推文的地理位置。暂未定义。
 * @prop {any} place 当存在时，指示推文关联（但不一定来自）地方。暂未定义。
 * @prop {number} quoted_status_id 此字段仅在推文为引用推文时显示。此字段包含引用的推文的整数推文 ID。
 * @prop {number} quoted_status_id_str 此字段仅在推文为引用推文时显示。此字段包含引用的推文的字符串推文 ID。
 * @prop {boolean} is_quote_status 标识该推文是否为引用推文
 * @prop {ITweet} quoted_status 此字段仅在推文为引用推文时显示。此属性包含引用的原始推文的 Tweet 对象。
 * @prop {ITweet} retweeted_status 可以通过该属性的存在来区分转推与典型的推文。此属性包含被转推的原始推文的表示形式。请注意，转推的转推不会显示中介转推，而只显示原始推文。
 * @prop {number} quote_count 指示此推文被其他用户引用的次数。(仅适用于高级和企业级产品)
 * @prop {number} reply_count 此推文被回复的次数。(仅适用于高级和企业级产品)
 * @prop {number} retweet_count 此推文被转推的次数。
 * @prop {number} favorite_count 此推文被喜爱的次数。
 * @prop {ITweetEnities} entities 已从推文文本中解析的实体。
 * @prop {ITweetEnities} extended_entities 当推文中包含 1 到 4 张本机照片/视频/GIF 时，该字段包含一个'media'元数据数组，这在引用推文中也会出现。
 */
export interface ITweet{
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    in_reply_to_status_id?: number;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id?: number;
    in_reply_to_user_id_str?: string;
    user: ITweetUser;
    coordinates: null;
    place: null;
    quoted_status_id?: number;
    quoted_status_id_str?: string;
    is_quote_status: boolean;
    quoted_status?: ITweet;
    retweeted_status?: ITweet;
    quote_count?: number;
    reply_count?: number;
    retweet_count: number;
    favorite_count: number;
    entities: ITweetEnities;
    extended_entities?: ITweetExtendedEntities;
    //发布推特来自平台 是一个http标签 例如 <a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>
    source?: string;
    //应该是 如果表示的推文是回复，则此字段将包含原始推文发布者的screen_name
    in_reply_to_screen_name?: string;
    //这两个字段表示当前认证的用户对该推文的点赞和转推状态
    favorited: boolean;
    retweeted: boolean;
    //推测应该是表示推文的语言
    lang: string;
    //之后再加类型
    geo: any;
    contributors: any;
    possibly_sensitive: boolean;
    possibly_sensitive_appealable: boolean;
}

export interface ITweetFollowsList{
    users: Array<ITweetUser>;
    next_cursor: number;
    next_cursor_str: string;
    previous_cursor: number;
    previous_cursor_str: string;
}