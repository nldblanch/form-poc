import type { FormQuestion } from './types';
import { createOptions } from './utils/valueConverter';

export const formQuestions: FormQuestion[] = [
    // Basic Information
    {
        id: 'name',
        question: 'Your name',
        type: 'text',
        options: [],
        required: true,
    },
    {
        id: 'email',
        question: 'Your email address',
        type: 'text',
        options: [],
        required: true,
    },
    {
        id: 'role',
        question: 'Your role',
        type: 'single',
        options: createOptions([
            'Youth lead',
            'Children\'s lead',
            'Youth and children\'s Lead',
            'Families lead',
            'Church leader',
            'Church eldership role (Deacon or similar)',
            'Next generations lead',
            'Other'
        ]),
        required: true,
    },
    {
        id: 'church_name',
        question: 'Church name',
        type: 'text',
        options: [],
        required: true,
    },
    {
        id: 'church_address',
        question: 'Church address',
        type: 'textarea',
        options: [],
        required: true,
    },
    {
        id: 'church_postcode',
        question: 'Church postcode',
        type: 'text',
        options: [],
        required: true,
    },
    {
        id: 'country',
        question: 'Country',
        type: 'single',
        options: createOptions([
            'England',
            'Scotland',
            'Wales'
        ]),
        required: true,
    },
    {
        id: 'church_denomination',
        question: 'Church denomination',
        type: 'single',
        options: createOptions([
            'AOG',
            'Apostolic Church',
            'Baptist',
            'Catholic',
            'Church of England',
            'Church of Pentecost',
            'Coptic',
            'Elim',
            'Methodist',
            'New Frontiers',
            'New Testament Church of God',
            'Non - Denominational',
            'Presbyterian',
            'Redeemed Christian Church of God',
            'Roman Catholic',
            'Salvation Army',
            'United Reformed',
            'Vineyard',
            'Other'
        ]),
        required: true,
    },

    // Youth Work Engagement
    {
        id: 'engaging_youth_work',
        question: 'Is your church currently engaging in youth work?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
    },
    {
        id: 'reasons_no_youth_work',
        question: 'Which of these areas are reasons why your church does not engage in youth work?',
        type: 'multiselect',
        options: createOptions([
            'Building/space restrictions',
            'Lack of volunteers',
            'No desire',
            'Finances',
            'No children or young people',
            'Lack of confidence in delivering youth work',
            'Aging membership',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'no',
        },
    },
    {
        id: 'want_youth_work',
        question: 'Would you like to see your church engaging in youth work?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'no',
        },
    },
    {
        id: 'youth_work_spaces',
        question: 'Which spaces would you like to establish youth work in?',
        type: 'multiselect',
        options: createOptions([
            'Schools based youth work',
            'Community based youth work',
            'Church based youth work',
            'Other'
        ]),
        required: true,
        dependsOn: [{
            id: 'engaging_youth_work',
            value: 'yes',
        }, {
            id: 'want_youth_work',
            value: 'yes',
        }],
    },
    {
        id: 'greatest_needs',
        question: 'From your perspective, what are the three greatest needs of young people in your area?',
        type: 'multiselect',
        options: createOptions([
            'No safe space to spend time',
            'Image and appearance',
            'Negative pressures of Social Media/ Networking',
            'Academic pressure at school',
            'Difficult friendships',
            'Future employment',
            'Bullying/relationship with peers',
            'Online/technology addiction',
            'Difficult family relationships',
            'Loneliness',
            'Poverty',
            'No positive role models',
            'I don\'t know',
            'Not enough to do',
            'Drugs and alcohol',
            'Poor mental health'
        ]),
        required: true,
        dependsOn: [{
            id: 'engaging_youth_work',
            value: 'yes',
        }, {
            id: 'want_youth_work',
            value: 'yes',
        }]
    },

    // Youth Worker Information
    {
        id: 'lead_youth_worker',
        question: 'Are you the lead youth worker?',
        type: 'single',
        options: createOptions(['Yes', 'No', 'We don\'t have one']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'youth_worker_contact',
        question: 'Please could you provide the name and contact of your lead youth worker?',
        type: 'text',
        options: [],
        required: true,
        dependsOn: {
            id: 'lead_youth_worker',
            value: 'no',
        },
    },
    {
        id: 'youth_worker_status',
        question: 'Is your youth worker:',
        type: 'single',
        options: createOptions([
            'Employed full time',
            'Employed part time',
            'Intern/work placement',
            'Volunteer youth worker',
            'We do not have a youth worker'
        ]),
        required: true,
        dependsOn: [{
            id: 'lead_youth_worker',
            value: 'yes',
        }, {
            id: 'lead_youth_worker',
            value: 'no',
        }]
    },

    // Team and Numbers
    {
        id: 'volunteer_count',
        question: 'How many volunteers (if any) make up your youth work team?',
        type: 'single',
        options: createOptions([
            'None',
            '1-5',
            '6-10',
            '11-15',
            '16- 20',
            '21- 30',
            'More than 30'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'weekly_young_people',
        question: 'The approximate number of young people (aged 11-18) you engage with on a weekly basis through your youth ministry:',
        type: 'single',
        options: createOptions([
            '0',
            '1-10',
            '11-20',
            '21-30',
            '31-40',
            '41-50',
            '51-60',
            '61-70',
            '70 or more'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'non_christian_youth',
        question: 'Of the above, how many of these young people are not Christians?',
        type: 'single',
        options: createOptions([
            'None',
            '1- 5',
            '6 -10',
            '11-20',
            '21-30',
            '31-40',
            '41-50',
            '51-60',
            '61-70',
            '71 or more',
            'I don\'t know'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'practicing_christians',
        question: 'How many young people are practicing Christians? (Practicing Christians = those who attend church at least monthly and, to your knowledge pray and read the Bible weekly)',
        type: 'single',
        options: createOptions([
            'None',
            '1-5',
            '6-10',
            '11-20',
            '21-30',
            '31-40',
            '41-50',
            '51-60',
            '61-70',
            '71 or more'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Youth Work Types
    {
        id: 'youth_work_types',
        question: 'What types of youth work is your church involved in?',
        type: 'multiselect',
        options: createOptions([
            'Youth service',
            'All age/messy church',
            'Youth group',
            'Youth Alpha',
            'Detached/community work',
            'Bible study/ life group',
            'Mentoring/discipleship',
            'Schools work',
            'Drop in/youth club',
            'Online ministry',
            'Sunday Church (separate provision for youth during the service)',
            'After school clubs',
            'Sports ministry',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'youth_work_strength',
        question: 'What would you say is your youth works greatest area of strength?',
        type: 'single',
        options: createOptions([
            'Sunday Church (separate provision for youth during the service)',
            'Youth service',
            'Schools work',
            'Bible study/life group',
            'Online ministry',
            'Drop in/youth club',
            'Mentoring/discipleship',
            'Youth group',
            'After school clubs',
            'Youth Alpha',
            'All age/messy church',
            'Sports ministry',
            'Detached/community work',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Evangelism and Outreach
    {
        id: 'evangelism_focus',
        question: 'Is your youth ministry focussed on outreach and evangelism?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'evangelism_degree',
        question: 'To what degree is your youth work focused on evangelism and outreach?',
        type: 'single',
        options: createOptions([
            'Occasionally',
            'Regularly',
            'That is our main focus'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'evangelism_activities',
        question: 'What does this look like in your youth work?',
        type: 'multiselect',
        options: createOptions([
            'Youth café',
            'Gaming/online',
            'Schools work',
            'Socials',
            'Detached work',
            'Youth Alpha',
            'Community events',
            'Sports ministry',
            'Peer evangelism',
            'Street evangelism',
            'Drop in youth club',
            'Mission trips',
            'Partnering with external organisations in events',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'content_with_evangelism',
        question: 'Are you content with the degree to which your work is focused on youth evangelism and outreach?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'church_evangelism_focus',
        question: 'To what degree would you say that your wider church is focused on evangelism and outreach?',
        type: 'single',
        options: createOptions([
            'It isn\'t',
            'Occasionally',
            'Regularly',
            'That is our church\'s main focus'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'decisions_for_christ',
        question: 'If you have had any young people make a decision to follow Jesus in the last year were they from:',
        type: 'multiselect',
        options: createOptions([
            'churched families',
            'non-churched families'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'churched_families_count',
        question: 'Approximately how many were from churched families?',
        type: 'text',
        options: [],
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'non_churched_families_count',
        question: 'Approximately how many from non-churched families?',
        type: 'text',
        options: [],
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Future Goals
    {
        id: 'next_year_goals',
        question: 'What is one thing that you would like to see happen in your youth work in the next year?',
        type: 'single',
        options: createOptions([
            'More peer evangelism',
            'More budget',
            'More young leaders',
            'More relevant teaching and content',
            'More young people serving in the church',
            'Getting a youth leader',
            'Better integration with the wider church',
            'Greater intergenerational connection',
            'Increased number of volunteers',
            'More schools and community work',
            'Better integration between church and unchurched',
            'Greater development of existing volunteers',
            'Deeper discipleship',
            'More baptisms/confirmations',
            'More young people making first time decisions to follow Jesus',
            'Clearer strategy',
            'Greater passion in existing young people',
            'More unchurched young people attending your youth provision',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'three_year_goals',
        question: 'What is one thing that you would like to see happen in your youth work in the next three years?',
        type: 'single',
        options: createOptions([
            'More peer evangelism',
            'More budget',
            'Clearer strategy',
            'Better integration between churched and unchurched',
            'A youth leader',
            'More unchurched young people attending your youth provision',
            'Better integration with the wider church',
            'More relevant teaching content',
            'More schools and community work',
            'More young people making first time decisions to follow Jesus',
            'More young people serving in the church',
            'Greater passion in existing young people',
            'Greater development of existing volunteers',
            'More baptisms/confirmations',
            'Greater intergenerational connection',
            'Deeper discipleship',
            'Increased number of volunteers',
            'More young leaders',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Challenges
    {
        id: 'greatest_challenge',
        question: 'What is the greatest challenge for you as a youth worker?',
        type: 'single',
        options: createOptions([
            'Confidence in your youth work skills',
            'Training',
            'Understanding youth culture',
            'Managing behaviour issues of youth',
            'Finances',
            'Resources',
            'Being overworked/burnt out',
            'Not enough volunteers',
            'Lack of Support',
            'Biblical knowledge',
            'Not enough time',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'youth_work_challenges',
        question: 'What is the greatest challenge that you face in your youth work?',
        type: 'single',
        options: createOptions([
            'Behaviour issues of youth',
            'Young people with additional needs',
            'Resources',
            'Training',
            'Not enough volunteers',
            'Struggles with churched & non-churched youth dynamics',
            'Supporting students with identity (including sexuality/gender)',
            'Finances',
            'Mental health and wellbeing',
            'Space to do youth work in',
            'Lack of support',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'outreach_challenges',
        question: 'What is the greatest challenge regarding outreach and evangelism in your community?',
        type: 'single',
        options: createOptions([
            'Safeguarding & risk assessments',
            'Understanding youth culture',
            'Not enough volunteers',
            'Finances',
            'Not enough time',
            'Behaviour issues',
            'Confidence in how to',
            'Not a church priority',
            'Training',
            'Knowing where young people spend their time',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'young_people_challenges',
        question: 'What is the greatest challenge that your young people are facing?',
        type: 'single',
        options: createOptions([
            'I don\'t know',
            'Image and appearance',
            'Loneliness',
            'Poor mental health',
            'Additional needs',
            'Relationships',
            'Cost of living',
            'Academic pressure',
            'Gangs',
            'Friendships',
            'Bullying',
            'Negative effects of porn',
            'Gender/sexual identity',
            'Family life',
            'Addictions',
            'Technology addiction',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // School Engagement
    {
        id: 'school_engagement',
        question: 'Do you engage with any of your local schools?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'school_engagement_frequency',
        question: 'How regularly?',
        type: 'single',
        options: createOptions([
            'Multiple days a week',
            'Weekly',
            'Monthly',
            'Half- termly',
            'Termly',
            'Yearly'
        ]),
        required: true,
        dependsOn: {
            id: 'school_engagement',
            value: 'yes',
        },
    },
    {
        id: 'school_engagement_types',
        question: 'How do you engage?',
        type: 'multiselect',
        options: createOptions([
            'Chaplaincy',
            'Assemblies/collective worship',
            'Lunch clubs/afterschool clubs',
            'RS/RE lessons',
            'Mentoring',
            'In class support',
            'Prayer spaces',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'school_engagement',
            value: 'yes',
        },
    },
    {
        id: 'school_names',
        question: 'What are the names of the schools that you are connected with?',
        type: 'text',
        options: [],
        required: true,
        dependsOn: {
            id: 'school_engagement',
            value: 'yes',
        },
    },
    {
        id: 'want_school_engagement',
        question: 'Would you like to engage in your local schools?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'school_engagement',
            value: 'no',
        },
    },
    {
        id: 'school_engagement_barriers',
        question: 'What are the greatest barriers that you face in achieving this?',
        type: 'multiselect',
        options: createOptions([
            'Lack of time',
            'Lack of volunteers',
            'Resistance from school',
            'Lack of connections/relationships',
            'Not sure how to do it',
            'Church priorities',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'want_school_engagement',
            value: 'yes',
        },
    },
    {
        id: 'no_school_engagement_reasons',
        question: 'Why do you not want to engage in your local school/s?',
        type: 'multiselect',
        options: createOptions([
            'Resistance from school',
            'Not sure how to do it',
            'Lack of connections/relationship',
            'Not our churches priority',
            'Lack of volunteers',
            'Lack of time',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'want_school_engagement',
            value: 'no',
        },
    },

    // Training and Resources
    {
        id: 'additional_training',
        question: 'Aside from annual safeguarding training, do you or your youth team engage in other training?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'training_types',
        question: 'Which training do you engage with?',
        type: 'multiselect',
        options: createOptions([
            'Regional network training',
            'Scripture Union',
            'SWYM',
            'Youthscape',
            'Youth for Christ',
            'Mental Health First Aid',
            'Youthlink',
            'Urban Saints',
            'Denominational training',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'additional_training',
            value: 'yes',
        },
    },
    {
        id: 'no_training_reasons',
        question: 'Is there a reason why you don\'t engage in other training?',
        type: 'single',
        options: createOptions([
            'Travel/distance',
            'Time',
            'Unsure of what\'s available',
            'Funding',
            'Lack of opportunities',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'additional_training',
            value: 'no',
        },
    },
    {
        id: 'resources_used',
        question: 'Which resources do you use (if any?)',
        type: 'multiselect',
        options: createOptions([
            'Scripture Union',
            'Urban Saints',
            'Youth Alpha',
            'Youth for Christ',
            'Youthscape',
            'None',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Partnerships
    {
        id: 'church_partnerships',
        question: 'Is your church partnering with other local churches in youth work?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },
    {
        id: 'partner_churches',
        question: 'List the churches that you partner with in your youth work below:',
        type: 'textarea',
        options: [],
        required: true,
        dependsOn: {
            id: 'church_partnerships',
            value: 'yes',
        },
    },
    {
        id: 'open_to_support',
        question: 'Would you be open to a conversation regarding supporting another church in establishing a youth ministry?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'engaging_youth_work',
            value: 'yes',
        },
    },

    // Waltham Forest Youth for Christ
    {
        id: 'wf_yfc_engagement',
        question: 'Have you engaged with Waltham Forest Youth for Christ in the past 5 years?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,

    },
    {
        id: 'no_wf_yfc_reasons',
        question: 'Please select any reasons why:',
        type: 'multiselect',
        options: createOptions([
            'There is no specific reason',
            'We had not heard of Waltham Forest Youth for Christ',
            'We are not aligned in theology or values',
            'We have no need for support in youth outreach and evangelism',
            'Other'
        ]),
        required: true,
        dependsOn: {
            id: 'wf_yfc_engagement',
            value: 'no',
        },
    },
    {
        id: 'wf_yfc_impact',
        question: 'Has Waltham Forest Youth for Christ impacted the ways in which you do or think about youth outreach?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,
        dependsOn: {
            id: 'wf_yfc_engagement',
            value: 'yes',
        },
    },
    {
        id: 'wf_yfc_impact_details',
        question: 'How has Waltham Forest Youth for Christ impacted how you do or think about outreach?',
        type: 'textarea',
        options: [],
        required: true,
        dependsOn: {
            id: 'wf_yfc_impact',
            value: 'yes',
        },
    },


    {
        id: 'wf_yfc_benefits',
        question: 'In what ways did/does Waltham Forest Youth for Christ benefit you as a church and/or your youth work?',
        type: 'textarea',
        options: [],
        required: true,
        dependsOn: {
            id: 'wf_yfc_impact',
            value: 'yes',
        },
    },
    {
        id: 'wf_yfc_challenges',
        question: 'Have you faced, or are you aware of any challenges in partnering with Waltham Forest Youth for Christ?',
        type: 'single',
        options: createOptions(['Yes', 'No']),
        required: true,

    },
    {
        id: 'wf_yfc_challenge_details',
        question: 'What are the challenges that you have faced, or perceived, whilst working with Waltham Forest Youth for Christ?',
        type: 'textarea',
        options: [],
        required: true,
        dependsOn: {
            id: 'wf_yfc_challenges',
            value: 'yes',
        },
    },
    {
        id: 'wf_yfc_future_interest',
        question: 'Would you be open to knowing more about Waltham Forest Youth for Christ in the following ways? By selecting these boxes you are consenting for us to contact you about these topics:',
        type: 'multiselect',
        options: createOptions([
            'Help hosting mission days/evangelistic events in the community',
            'Local training opportunities for youth work',
            'Help connecting with local schools',
            'The general work of Waltham Forest Youth for Christ',
            'Youth for Christ supporting the growth and development of your youth ministry',
            'How you can be more connected with youth work in your area',
            'None of the above',
            'Being part of a prayer network',
            'How to use your building for youth work',
            'Helping financially resource youth work',
            'Other'
        ]),
        required: true,
    },

    // Final Comments
    {
        id: 'additional_comments',
        question: 'Do you have any other comments relating to the topics that we have been discussing?',
        type: 'textarea',
        options: [],
        required: false,
    },
];
