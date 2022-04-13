//const { Message , Client , Intents, MessageEmbed } = require("discord.js")
const channel = require("./channel.js")
const poll = require("./poll.js");
const reminder = require("./reminder.js")
//import {text , voice} from '../channel'
//const { InviteTargetType } = require("discord.js/typings/enums")

describe('Channel Creation Handler' , () => {
    // jest.mock('discord.js' , () => ({
    //     Client: jest.fn(),
    //     Message: jest.fn().mockImplementation(() => ({
    //         channel: jest.fn().mockImplementation(() => ({
    //             send: jest.fn((x) => 'Text Channel created!'),
    //         })),
    //     })),
    // }));
    // jest.fn().mockImplementation(() => {
    //     return {
    //         send: jest.fn()
    //     }
    // })
    const message = ({
      channel: {
        send: jest.fn(),
      }
    })
    it("Should create text channel" , async() => {
        channel.textTest([ '$tu', 'textchat', 'group-1' ] , message)
    })
    it("Should create voice channel" , async() => {
      channel.voiceTest([ '$tu', 'textchat', 'group-1' ] , message)
  })
})

describe('Poll Creation Handler' , () => {
  const message = ({
    channel: {
      send: jest.fn(),
    }
  })

  it("Should create simple poll" , async() => {
    poll.pollTest1([ '$tu', 'poll', 'test' ] , message)
  })
  it("Should create multiple choice poll" , async() => {
    poll.pollTest2([ '$tu', 'poll', 'test' ] , message)
  })
})

describe('Reminder Handler' , () => {
  const message = ({
    channel: {
      send: jest.fn(),
    }
  })

  it("Should add assignment to reminders list" , async() => {
    reminder.assignTest([ '$tu', 'remind', 'test' ] , message)
  })
  it("Should send a message containing all assignments" , async() => {
    reminder.remindTest([ '$tu', 'remind', 'test' ] , message)
  })
  it("Should send a reminder of assignments that are due soon" , async() => {
    reminder.autoRemindTest([ '$tu', 'remind', 'test' ] , message)
  })
  it("Should set REMINDER_HOUR" , async() => {
    reminder.changeReminderHourTest([ '$tu', 'remind', 'test' ] , message)
  })
  it("Should delete assignment based on ID" , async() => {
    reminder.deleteAssignmentTest([ '$tu', 'remind', 'test' ] , message)
  })
  it("Should clear assignments" , async() => {
    reminder.clearAssignmentsTest([ '$tu', 'remind', 'test' ] , message)
  })
})