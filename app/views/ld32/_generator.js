var Generator = {
  p1: [
    'ACID',
    'ZERO',
    'FIRE',
    'CLOAK',
    'TREE',
    'SHADOW',
    'RED',
    'BLUE',
    'GREEN',
    'WHITE',
    'BLACK',
    'SPRAY',
    'RADIO',
    'SMART',
    'SAND',
    'CYBER',
    'POV',
  ],
  p2: [
    'FOX',
    'BURN',
    'COOL',
    'CONFIG',
    'BEARD',
    'PUNK',
    'DRAGON',
    'SNAKE',
    'LION',
    'SWORD',
    'SQUIRREL',
    'SEED',
    'STORM',
    'COMMANDO',
    'DARE',
    'CAT'
  ],
  attack: [
    'Bypassing Firewall',
    'Mapped Network Topology'
  ],
  defend: [
    'Nullrouted Malicious IP range',
    'IDS Detected Anomalous Access'
  ],
  member_refusal: [
    [
      'I will take my services elsewhere.'
    ],
    [
      "I'm sure another nation will adequately compensate",
      'me for my skils.'
    ],
    [
      'Your loss.'
    ],
  ],
  member_accept: [
    [
      'Glad to be of service.'
    ],
    [
      "I'll put my corporate clients on hold immediately.",
    ],
    [
      'Fascinating...'
    ],
  ],
  member_offer: [
    [
      'So, I heard you folks have a little clandestine department thingy',
      'going on...'
    ],
    [
      'You need someone with my 1337 skillz.',
    ],
    [
      'You need root? I can get it.',
    ],
    [
      "Firewalls? Psssh. You want to get past them, I'm your man.",
    ],
    [
      "What I do have are a very particular set of skills, skills I",
      "have acquired over a very long career."
    ]
  ],
  day_nothing: [
    [
      'Nothing to report.'
    ],
    [
      'Awaiting Instructions'
    ],
    [
      'Scanning /0. '
    ],
    [
      'System nominal.'
    ],
  ],
  new_calendar_target: [
    [
      'We need %ip% to respond to C&C pings by %date%.',
      'Make it happen.',
      '## SIGCHECK: OK. HASH 09F91102 ##'
    ],
    [
      'We used to have presence on %ip% but they took us out.',
      'It is critical that we have access before %date%.'
    ]
  ],
  check_calendar_target: [
    [
      'From: 3567/APRA-1234 <<',
      'Requesting verification of %ip% takedown.',
      '>> '
    ],
    [
      '<<C&C Daemon>> PING %ip%'
    ]
  ],
  takedown_success: [
    [
      'Successful Takedown'
    ],
    [
      'Takedown success.'
    ]
  ],
  takedown_failure: [
    [
      'Failed Takedown'
    ],
    [
      'Takedown failure.'
    ]
  ],
  new_pwn_target: [
    [
      '%ip% is a potential target',
      "Let's expand our operational capability."
    ],
    [
      '%ip% presents strategic importance.',
      "You know what to do."
    ]
  ],
  generate_exploit: [
    [
      'Found a russian darknet forum with a useful technique in it.',
      'Added it to the toolchain.'
    ],
    [
      "Message >> VALID SIG",
      "Is there any reason we aren't using CVE-"+(Math.floor(Math.random() * 0x10000).toString(16).toUpperCase())+"?",
      ">> EOF"
    ],
    [
      "Please find attached malware sample. Utilises novel techniques for",
      'popping shells on hardened clients.'
    ],
  ],
  buy_zeroday: [
    [
      'Message:// ',
      "It's not going to be cheap. But I have a",
      'feeling your agency will get use out of this.'
    ],
    [
      'Message:// ',
      "I have contacts in Russia and China. Or I can sell you the code,",
      'for the right fee, of course...'
    ],
  ],
  win_proxy: [
    [
      'Host Compromise Success.',
      'OnionRouting.exe deploy: [ OK ]'
    ],
    [
      'Host Compromise Success.',
      'OnionRouting.exe deploy: [ OK ]'
    ]
  ],
  win_botnet: [
    [
      'Root Access Granted',
      'Command and Control server received Ping.'
    ],
    [
      'Root Access Granted',
      'Command and Control server received Ping.'
    ]
  ],
  win_takedown: [
    [
      'Host Neutralised'
    ],
    [
      'Network Activity Suppressed'
    ]
  ],
  garbage: "!£$%^&*:@~;'#/\\1234567890_-=+",
  team_member: function()
  {
    var name1 = this.p1[Math.floor(Math.random() * this.p1.length)]
    var name2 = this.p2[Math.floor(Math.random() * this.p2.length)]

    return name1 + name2
  },
  message_member_refusal: function()
  {
    return this.member_refusal[Math.floor(Math.random() * this.member_refusal.length)]
  },
  message_member_accept: function()
  {
    return this.member_accept[Math.floor(Math.random() * this.member_accept.length)]
  },
  message_member_offer: function(member)
  {
    return this.member_offer[Math.floor(Math.random() * this.member_offer.length)].concat(Generator.member_stats(member))
  },
  message_day_nothing: function()
  {
    return this.day_nothing[Math.floor(Math.random() * this.day_nothing.length)]
  },
  garbage_character: function()
  {
    return this.garbage[Math.floor(Math.random() * this.garbage.length)]
  },
  message_new_pwn_target: function(target)
  {
    var lines = this.new_pwn_target[Math.floor(Math.random() * this.new_pwn_target.length)]

    lines = lines.map(function(line) {
      return line.replace('%ip%', target.ip)
    });

    return lines
  },
  message_new_calendar_target: function(target, day)
  {
    var lines = this.new_calendar_target[Math.floor(Math.random() * this.new_calendar_target.length)]

    lines = lines.map(function(line) {
      line = line.replace('%ip%', target.ip)
      line = line.replace('%date%', GameDay.displayDate(day))

      return line
    });

    return lines
  },
  message_check_calendar_target: function(target, day)
  {
    var lines = this.check_calendar_target[Math.floor(Math.random() * this.check_calendar_target.length)]

    lines = lines.map(function(line) {
      line = line.replace('%ip%', target.ip)
      line = line.replace('%date%', GameDay.displayDate(day))

      return line
    });

    return lines
  },
  message_takedown_failure: function(amt)
  {
    var msg = this.takedown_failure[Math.floor(Math.random() * this.takedown_failure.length)]
    return msg.concat(['', (amt*2) + '% Approval Rating Lost'])
  },
  message_takedown_success: function(amt)
  {
    var msg = this.takedown_success[Math.floor(Math.random() * this.takedown_success.length)]
    return msg.concat(['', (amt*2) + '% Approval Rating Gained'])
  },

  message_generate_exploit: function()
  {
    var lines = this.generate_exploit[Math.floor(Math.random() * this.generate_exploit.length)]
    lines = lines.concat(['','1 Exploit Found.'])

    return lines
  },
  message_buy_zeroday: function(price) {
    var lines = this.buy_zeroday[Math.floor(Math.random() * this.buy_zeroday.length)]
    return lines.concat(['', 'Buy Zeroday Exploit for '+price.toFixed(8)+" BTC?", "(Current Assets: " + GamePlayer.totals.btc.toFixed(8) + " BTC)"])
  },
  message_win_botnet: function()
  {
    var msg = this.win_botnet[Math.floor(Math.random() * this.win_botnet.length)]
    return msg.concat(['', 'Node added to botnet.'])
  },
  message_win_proxy: function()
  {
    var msg = this.win_proxy[Math.floor(Math.random() * this.win_proxy.length)]
    return msg.concat(['', 'Node added to proxy array.'])
  },
  message_win_takedown: function()
  {
    var msg = this.win_takedown[Math.floor(Math.random() * this.win_takedown.length)]
    return msg.concat(['', 'Takedown Objective Complete.'])
  },
  member_stats: function(member)
  {
    var stats =  [
      '',
      'Codename:     ' + member.name,
      'Attribution:  ' + member.skills.attribution.toFixed(3),
      'Scanning:     ' + member.skills.scanning.toFixed(3),
      'Exploitation: ' + member.skills.exploitation.toFixed(3),
      'Pwnage:       ' + member.skills.pwnage.toFixed(3),
      'Price:        ' + member.btc.toFixed(8)+' btc/day'
    ]

    for(var i=0; i<stats.length;i++)
    {
      stats[i] = padString(stats[i], 38)
    }

    return stats;
  },
  target_stats: function(target)
  {
    var target_stats = [
      '',
      '',
      //'Scanning:       ' + target.stats.scannability,
      //'Exploitability: ' + target.stats.exploitability,
      'Mission Type:   ' + target.type,
      'IP:             ' + target.ip,
      'Defensibility:  ' + target.stats.pwnability,
      'Attribution:    ' + target.stats.attribution.toFixed(0)+"%",
    ]

    var us_stats = this.get_total_skills();

    for(var i=0; i<target_stats.length;i++)
    {
      target_stats[i] = padString(target_stats[i], 38)
    }

    for(var i=0; i<us_stats.length;i++)
    {
      us_stats[i] = padString(us_stats[i], 38)
    }

    for(var i=0;i<target_stats.length; i++)
    {
      target_stats[i] = target_stats[i] +"" + us_stats[i];
    }

    return target_stats;
  },
  get_attack: function(amt)
  {
    var str = this.attack[Math.floor(Math.random() * this.attack.length)]
    str = "  ["+ rightPadString((amt * 2).toFixed(2), 6) + "%] " + str
    return str;
  },
  get_defend: function(amt)
  {
    var str = this.defend[Math.floor(Math.random() * this.defend.length)]
    str = rightPadString(str, 59) + " ["+ rightPadString((amt * 2).toFixed(2), 6) + "%]"
    return str;
  },


  get_total_skills: function()
  {
    return [
      'Total Skills:       ',
      '  Attribution:      ' + GamePlayer.totals.skills.attribution().toFixed(3),
      '  Scanning:         ' + GamePlayer.totals.skills.scanning().toFixed(3),
      '  Exploitation:     ' + GamePlayer.totals.skills.exploitation().toFixed(3),
      '  Pwnage:           ' + GamePlayer.totals.skills.pwnage().toFixed(3),
      'Deniability:        ' + GamePlayer.totals.stats.deniability().toFixed(0)+"%",
      ''
    ]
  },

  show_total_power: function()
  {
    stats = GamePlayer.totals;
    a1 = [
      'Pwned:  ',
      '  Proxies:         ' + stats.pwned.proxies,
      '  Botnet :         ' + stats.pwned.botnet,
      'Exploits:          ',
      '  Standard:        ' + stats.exploits.standard,
      '  Zeroday:         ' + stats.exploits.zeroday,
      '                   '
    ]

    a2 = this.get_total_skills();

    for(var i=0; i<a1.length;i++)
    {
      a1[i] = padString(a1[i], 38);
    }

    for(var i=0; i<a2.length;i++)
    {
      a2[i] = padString(a2[i], 38)
    }

    for(var i=0;i<a1.length; i++)
    {
      a1[i] = a1[i] +"" + a2[i];
    }

    return a1;
  },
  show_two_members: function(m1, m2)
  {
    var s1 = this.member_stats(m1);
    var s2 = this.member_stats(m2);

    for(var i=0;i<s1.length; i++)
    {
      s1[i] = s1[i] +"" + s2[i];
    }

    return s1
  }


}
