/*
 * Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.
 * This product includes software developed at Datadog (https://www.datadoghq.com/).
 * Copyright 2019-Present Datadog, Inc.
 */

import Foundation

/// Datadog site that SDK sends data to.
/// See: https://docs.datadoghq.com/getting_started/site/
public typealias DatadogSite = Datadog.Configuration.DatadogEndpoint

public struct DatadogContext {
    // MARK: - Datadog Specific

    /// [Datadog Site](https://docs.datadoghq.com/getting_started/site/) for data uploads. It can be `nil` in V1
    /// if the SDK is configured using deprecated APIs:
    /// `set(logsEndpoint:)`, `set(tracesEndpoint:)` and `set(rumEndpoint:)`.
    public let site: DatadogSite?

    /// The client token allowing for data uploads to [Datadog Site](https://docs.datadoghq.com/getting_started/site/).
    public let clientToken: String

    /// The name of the service that data is generated from. Used for [Unified Service Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging).
    let service: String

    /// The name of the environment that data is generated from. Used for [Unified Service Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging).
    let env: String

    /// The version of the application that data is generated from. Used for [Unified Service Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging).
    public internal(set) var version: String

    /// The variant of the build, equivelent to Android's "Flavor".  Only used by cross platform SDKs
    let variant: String?

    /// Denotes the mobile application's platform, such as `"ios"` or `"flutter"` that data is generated from.
    ///  - See: Datadog [Reserved Attributes](https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes).
    public let source: String

    /// The version of Datadog iOS SDK.
    public let sdkVersion: String

    /// The name of [CI Visibility](https://docs.datadoghq.com/continuous_integration/) origin.
    /// It is only set if the SDK is running with a context passed from [Swift Tests](https://docs.datadoghq.com/continuous_integration/setup_tests/swift/?tab=swiftpackagemanager) library.
    let ciAppOrigin: String?

    /// Interval between device and server time.
    ///
    /// The value can change as the device continue to sync with the server.
    var serverTimeOffset: TimeInterval = .zero

    // MARK: - Application Specific

    /// The name of the application, read from `Info.plist` (`CFBundleExecutable`).
    public let applicationName: String

    /// The bundle identifier, read from `Info.plist` (`CFBundleIdentifier`).
    let applicationBundleIdentifier: String

    /// Date of SDK initialization measured in device time (without NTP correction).
    let sdkInitDate: Date

    /// Current device information.
    public let device: DeviceInfo

    /// Current user information.
    var userInfo: UserInfo?

    /// The user's consent to data collection
    var trackingConsent: TrackingConsent = .pending

    /// Application launch time.
    ///
    /// Can be `nil` if the launch could not yet been evaluated.
    var launchTime: LaunchTime?

    /// Provides the history of app foreground / background states.
    var applicationStateHistory: AppStateHistory

    // MARK: - Device Specific

    /// Network information.
    ///
    /// Represents the current state of the device network connectivity and interface.
    /// The value can be `unknown` if the network interface is not available or if it has not
    /// yet been evaluated.
    var networkConnectionInfo: NetworkConnectionInfo?

    /// Carrier information.
    ///
    /// Represents the current telephony service info of the device.
    /// This value can be `nil` of no service is currently registered, or if the device does
    /// not support telephony services.
    var carrierInfo: CarrierInfo?

    /// The current mobile device battery status.
    ///
    /// This value can be `nil` of the current device battery interface is not available.
    var batteryStatus: BatteryStatus?

    /// `true` if the Low Power Mode is enabled.
    var isLowPowerModeEnabled = false

    /// Feature attributes provider.
    public internal(set) var featuresAttributes: [String: FeatureBaggage] = [:]
}
